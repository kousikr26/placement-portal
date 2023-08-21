from django.shortcuts import render, redirect
from .models import *
from .forms import *
from django.template import RequestContext
from django.template.context_processors import csrf
from django.http import HttpResponseRedirect,JsonResponse,HttpResponseNotFound
from django.contrib.auth.decorators import login_required
from django.db.models.functions import Lower
from django.template.loader import render_to_string
from django.utils.text import slugify
from django.contrib.auth.decorators import login_required
import json


def home(request):
  return render(request,'home/home.html',{})

def permission_not_granted(request):
    return render(request,'403.html')

def handler404(request,exception,template_name='404.html'):
    return render(request,template_name)
def handler500(request):
    return render(request,'500.html')

all_years = ['2023','2022']

COMPANY_COUNT=70
@login_required
def charts(request):
	
	branches = ["CSE", "MNC", "EE", "ME", "CE", "CL", "EP", "CST", "BT", "DS","Physics", "Chemistry", "Mathematics", "Design", "Others"]
	dens_btech={
		'2022' : {"CSE":83,"MNC":56, "EE":116, "ME":70,"CL":58,"EP":22,"CST":38,"BT":49,"Design":26,"CE":52},
		'2023' : {"CSE":108,"MNC":68 , "EE":154, "ME":101,"CL":69,"Physics":42,"CST":43,"BT":55,"Design":50,"CE":79}
	}
	dens_mtech={
		'2022':{"CSE":54,"BT":38,"EE":74,"ME":103,"CE":85,"Design":33,"CL":68,"DS":18},
		'2023' : {"ME"	:3, "CST"	:3, "Development Studies"	:0, "School of Agro and Rural Technology"	:11, "BT"	:30, "CL"	:2, "Petroleum Science and Technology"	:29, "Chemistry"	:0, "Physics"	:0, "Robotics and Artificial Intelligence"	:16, "Data Science"	:13, "ECE"	:2, "CE"	:4, "CSE"	:59, "Design"	:4, "EP"	:0, "Materials Science and Technology"	:26, "Environment Engineering"	:17, "Geotechnical Engineering"	:17, "Energy"	:0, "Mathematics"	:2, "EEE"	:1, "MNC"	:2, "Manufacturing Science & Engineering"	:18, "Aerodynamics & Propulsion"	:8, "E-Mobility"	:1, "Computational Mechanics"	:8, "Fluids and Thermal Engineering"	:25, "Machine Design"	:24, "Infrastructure Engineering & Management"	:4, "Transportation Systems Engineering"	:17, "Communication Engineering"	:16, "VLSI"	:12, "Power Engineering"	:8, "Systems control & automation"	:3, "Structural Engineering"	:14, "SPML"	:16, "Biotechnology"	:0, "RF & Photonics"	:7, "Water Resources Engineering & Management"	:16, "Earth Systems Science and Engineering"	:8, "Disaster Mangement and Risk Reduction"	:0, "Food Science and Technology"	:5}
		}
	dens_others={
		'2022':{"Humanities":34,"Energy":8,"Physics":14,"Chemistry":22,"Mathematics":30},
		'2023':{"Development Studies":	41,"Energy":	14,"Disaster Mangement and Risk Reduction":	9,"E-Mobility":	4,"EE":	2,"Manufacturing Science & Engineering":	1, "CSE" : 1, "Chemistry":29, "Physics": 23, "BT" : 2, "Design": 2, "Data Science": 1, "Mathematics":47}
	}
	years = request.GET.get('year')
	if years is None:
		years = max(all_years)
	btech_total=0
	mtech_total=0
	others_total=0
	for i in dens_btech[years]:
		btech_total+=dens_btech[years][i]
	for i in dens_mtech[years]:
		mtech_total+=dens_mtech[years][i]
	for i in dens_others[years]:
		others_total+=dens_others[years][i]
	btech_all=Student.objects.filter(programs__in=['B.Tech','B.Des']).filter(placed=True, year_placed=years)
	mtech_all=Student.objects.filter(programs__in=['M.Tech','M.Des']).filter(placed=True, year_placed=years)
	others_all=Student.objects.filter(programs__in=['M.Sc','M.S',"M.A", "Others"]).filter(placed=True, year_placed=years)

	btech_placed=len(btech_all)
	mtech_placed=len(mtech_all)
	others_placed=len(others_all)

	btech_percent_placed = json.dumps({"Placed": btech_placed, "Not placed": btech_total-btech_placed})
	mtech_percent_placed = json.dumps({"Placed": mtech_placed, "Not placed": mtech_total-mtech_placed})
	others_percent_placed = json.dumps({"Placed": others_placed, "Not placed": others_total-others_placed})

	comp_counts_btech={}
	comp_counts_mtech={}
	comp_counts_others={}

	for i in btech_all:
		if(i.company in comp_counts_btech):
			comp_counts_btech[i.company]+=1
		else:
			comp_counts_btech[i.company]=1

	for i in mtech_all:
		if(i.company in comp_counts_mtech):
			comp_counts_mtech[i.company]+=1
		else:
			comp_counts_mtech[i.company]=1

	for i in others_all:
		if(i.company in comp_counts_others):
			comp_counts_others[i.company]+=1
		else:
			comp_counts_others[i.company]=1

	comp_btech_counts=list(comp_counts_btech.values())
	comp_mtech_counts=list(comp_counts_mtech.values())
	comp_others_counts=list(comp_counts_others.values())

	comp_btech_counts.sort(reverse=True)
	comp_mtech_counts.sort(reverse=True)
	comp_others_counts.sort(reverse=True)

	btech_threshold=0
	mtech_threshold=0
	others_threshold=0

	if(len(comp_btech_counts)>COMPANY_COUNT):
		btech_threshold=comp_btech_counts[COMPANY_COUNT]
	if(len(comp_mtech_counts)>COMPANY_COUNT):
		mtech_threshold=comp_mtech_counts[COMPANY_COUNT]
	if(len(comp_others_counts)>COMPANY_COUNT):
		others_threshold=comp_others_counts[COMPANY_COUNT]

	comp_count_lis_btech=[]
	comp_count_lis_mtech=[]
	comp_count_lis_others=[]

	for i in comp_counts_btech:
		tmp={}
		if(i=="" or comp_counts_btech[i]<btech_threshold):
			continue
		tmp["tag"]=i
		tmp["weight"]=comp_counts_btech[i]
		tmp["urlval"]=i.replace(' ','%20')
		comp_count_lis_btech.append(tmp)

	for i in comp_counts_mtech:
		tmp={}
		if(i=="" or comp_counts_mtech[i]<mtech_threshold):
			continue
		tmp["tag"]=i
		tmp["weight"]=comp_counts_mtech[i]
		tmp["urlval"]=i.replace(' ','%20')
		comp_count_lis_mtech.append(tmp)

	for i in comp_counts_others:
		tmp={}
		if(i=="" or comp_counts_others[i]<others_threshold):
			continue
		tmp["tag"]=i
		tmp["weight"]=comp_counts_others[i]
		tmp["urlval"]=i.replace(' ','%20')
		comp_count_lis_others.append(tmp)

	btech_branchwise_placements=[]
	mtech_branchwise_placements = []
	others_branchwise_placements=[]

	for bch in branches:
		tmp={}
		tmp["group"]=bch
		if bch not in dens_btech[years]:
			continue
		if(bch=="Design"):
			num=len(Student.objects.filter(programs='B.Des').filter(
				branch__branchName=bch).filter(placed=True, year_placed=years))
			den = dens_btech[years][bch]
		elif(bch=="EE"):
			num = len(Student.objects.filter(programs='B.Tech').filter(
				branch__branchName__in=["ECE","EEE","EE"]).filter(placed=True, year_placed=years))
			den = dens_btech[years][bch]
		else:
			num = len(btech_all.filter(branch__branchName=bch))
			den = dens_btech[years][bch]
		if(num==0):
			continue
		tmp["value"] = round((num/den)*100,2)
		tmp["num"]=num
		tmp["den"]=den
		btech_branchwise_placements.append(tmp)
	for bch in branches:
		tmp = {}
		tmp["group"] = bch
		if bch not in dens_mtech[years]:
			continue
		if(bch=="Design"):
			num=len(Student.objects.filter(programs='M.Des').filter(
				branch__branchName=bch).filter(placed=True , year_placed=years))
			den = dens_mtech[years][bch]
		elif(bch=="EE"):
			num = len(Student.objects.filter(programs='M.Tech').filter(
				branch__branchName__in=["ECE","EEE"]).filter(placed=True, year_placed=years))
			den = dens_mtech[years][bch]
		else:
			num = len(mtech_all.filter(branch__branchName=bch))
			den = dens_mtech[years][bch]
		if(num == 0):
			continue
		tmp["value"] = round((num/den)*100,2)
		tmp["num"]=num
		tmp["den"]=den
		mtech_branchwise_placements.append(tmp)

	for i in dens_others[years]:

		tmp = {}
		tmp["group"] = i
		if i not in dens_others[years]:
			continue

		num = len(others_all.filter(branch__branchName=i))
		den = dens_others[years][i]
		if(num == 0):
			continue
		tmp["value"] = round((num/den)*100,2)
		tmp["num"]=num
		tmp["den"]=den
		others_branchwise_placements.append(tmp)

	context = {
			"btech_percent_placed": btech_percent_placed,
			"mtech_percent_placed": mtech_percent_placed,
			"others_percent_placed":others_percent_placed,
			"btech_branchwise_placements": json.dumps(btech_branchwise_placements),
			"mtech_branchwise_placements": json.dumps(mtech_branchwise_placements),
			"others_branchwise_placements":json.dumps(others_branchwise_placements),
			"company_count":comp_count_lis_btech,
			"company_count_mtech":comp_count_lis_mtech,
			"company_count_others":comp_count_lis_others,
			"years" : all_years,
			}

	
	onlydata = request.GET.get('data')
	if onlydata is None:
		return render(request, "home/stats.html", context )
	else:
		return JsonResponse(context, safe=False)
################################################################################
# function to render the table

@login_required
def get_table(request):
	company = request.GET.get('company')
	if company:
		students  = Student.objects.filter(company=company)
	else:
		students  = Student.objects.filter(placed=True)

	branches = Branch.objects.all()
	context = {'students':students,'branches':branches, "years": all_years}
	return render(request,'home/table_home.html',context)

################################################################################

# function to filter the table data

@login_required
def ajax_table_filter(request):
	data = dict()
	if request.method == 'GET' and request.is_ajax():
		branch = request.GET.get('branch')
		program = request.GET.get('program')
		sortid = request.GET.get('sortid')
		company = request.GET.get('company')
		year = request.GET.get('year')
		students = Student.objects.filter(placed=True)
		if company:
			students= students.filter(company=company)
		if branch!='all':
			branch = Branch.objects.get(branchName=branch)
			students = students.filter(branch=branch)
		if program!='all':
			students = students.filter(programs=program)
		if year!='all' and year is not None:
			students = students.filter(year_placed=year)
		students = students.order_by(Lower(sortid))
		branches = Branch.objects.all()
		context = {'students':students,'branches':branches, "years": all_years}
		data['table_data_html'] = render_to_string('home/table_data.html',context)
		data['success'] = True
	else:
		data['success'] = False
	return JsonResponse(data)
################################################################################
