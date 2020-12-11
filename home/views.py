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


COMPANY_COUNT=70
@login_required
def charts(request):

	branches = ["CSE", "MNC", "EE", "ME", "CE", "CL", "EP", "CST", "BT", "Physics", "Chemistry", "Mathematics", "Design", "Others"]
	dens_btech={"CSE":83,"MNC":56,"EE":116,"ME":70,"CL":58,"EP":22,"CST":38,"BT":49,"Design":35,"CE":52}
	dens_mtech={"CSE":54,"BT":38,"EE":74,"ME":103,"CE":85,"Design":33,"CL":68,"Others":29}
	btech_total=0
	mtech_total=0
	for i in dens_btech:
		btech_total+=dens_btech[i]
	for i in dens_mtech:
		mtech_total+=dens_mtech[i]
	btech_placed=len(Student.objects.filter(
		programs__in=['B.Tech','B.Des']).filter(placed=True))
	mtech_placed=len(Student.objects.filter(
		programs__in=['M.Tech','M.Des']).filter(placed=True))
	btech_percent_placed = json.dumps({"Placed": btech_placed, "Not placed": btech_total-btech_placed})
	mtech_percent_placed = json.dumps({"Placed": mtech_placed, "Not placed": mtech_total-mtech_placed})
	btech_all=Student.objects.filter(programs__in=['B.Tech','B.Des']).filter(placed=True)
	mtech_all=Student.objects.filter(programs__in=['M.Tech','M.Des']).filter(placed=True)
	comp_counts={}
	comp_counts_mtech={}


	for i in btech_all:
		if(i.company in comp_counts):
			comp_counts[i.company]+=1
		else:
			comp_counts[i.company]=1

	for i in mtech_all:
		if(i.company in comp_counts_mtech):
			comp_counts_mtech[i.company]+=1
		else:
			comp_counts_mtech[i.company]=1
	comp_btech_counts=list(comp_counts.values())
	comp_mtech_counts=list(comp_counts_mtech.values())
	comp_btech_counts.sort(reverse=True)
	comp_mtech_counts.sort(reverse=True)
	btech_threshold=0
	mtech_threshold=0
	if(len(comp_btech_counts)>COMPANY_COUNT):
		btech_threshold=comp_btech_counts[COMPANY_COUNT]
	if(len(comp_mtech_counts)>COMPANY_COUNT):
		mtech_threshold=comp_mtech_counts[COMPANY_COUNT]
	comp_count_lis=[]
	comp_count_lis_mtech=[]
	for i in comp_counts:
		tmp={}
		if(i=="" or comp_counts[i]<btech_threshold):
			continue
		tmp["tag"]=i
		tmp["weight"]=comp_counts[i]
		tmp["urlval"]=i.replace(' ','%20')

		comp_count_lis.append(tmp)
	for i in comp_counts_mtech:
		tmp={}
		if(i=="" or comp_counts_mtech[i]<mtech_threshold):
			continue
		tmp["tag"]=i
		tmp["weight"]=comp_counts_mtech[i]
		tmp["urlval"]=i.replace(' ','%20')
		comp_count_lis_mtech.append(tmp)
	btech_branchwise_placements=[]
	mtech_branchwise_placements = []
	cse_wc=[]
	for bch in branches:
		tmp={}
		tmp["group"]=bch
		if bch not in dens_btech:
			continue
		if(bch=="Design"):
			num=len(Student.objects.filter(programs='B.Des').filter(
				branch__branchName=bch).filter(placed=True))
			den = dens_btech[bch]
		elif(bch=="EE"):
			num = len(Student.objects.filter(programs='B.Tech').filter(
				branch__branchName__in=["ECE","EEE"]).filter(placed=True))
			den = dens_btech[bch]
		else:
			num = len(Student.objects.filter(programs='B.Tech').filter(
				branch__branchName=bch).filter(placed=True))
			den = dens_btech[bch]
		if(den==0):
			continue
		tmp["value"] = round((num/den)*100,2)
		tmp["num"]=num
		tmp["den"]=den
		btech_branchwise_placements.append(tmp)
	for bch in branches:
		tmp = {}
		tmp["group"] = bch
		if bch not in dens_mtech:
			continue
		if(bch=="Design"):
			num=len(Student.objects.filter(programs='M.Des').filter(
				branch__branchName=bch).filter(placed=True))
			den = dens_mtech[bch]
		elif(bch=="EE"):
			num = len(Student.objects.filter(programs='M.Tech').filter(
				branch__branchName__in=["ECE","EEE"]).filter(placed=True))
			den = dens_mtech[bch]
		else:
			num = len(Student.objects.filter(programs='M.Tech').filter(
				branch__branchName=bch).filter(placed=True))
			den = dens_mtech[bch]
		if(den == 0):
			continue
		tmp["value"] = round((num/den)*100,2)
		tmp["num"]=num
		tmp["den"]=den
		mtech_branchwise_placements.append(tmp)
	context = {"btech_percent_placed": btech_percent_placed,
			"mtech_percent_placed": mtech_percent_placed,
			"btech_branchwise_placements": json.dumps(btech_branchwise_placements),
			"mtech_branchwise_placements": json.dumps(mtech_branchwise_placements),
			"company_count":comp_count_lis,
			"company_count_mtech":comp_count_lis_mtech
			}

	# print(context)
	return render(request, "home/stats.html",context )
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
	context = {'students':students,'branches':branches}
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
		students = Student.objects.filter(placed=True)
		if company:
			students= students.filter(company=company)
		if branch!='all':
			branch = Branch.objects.get(branchName=branch)
			students = students.filter(branch=branch)
		if program!='all':
			students = students.filter(programs=program)

		students = students.order_by(Lower(sortid))
		data['table_data_html'] = render_to_string('home/table_data.html',{'students':students})
		data['success'] = True
	else:
		data['success'] = False
	return JsonResponse(data)
################################################################################
