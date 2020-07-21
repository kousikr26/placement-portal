from django.shortcuts import render, redirect
from .models import *
from .forms import *
from django.template import RequestContext
from django.template.context_processors import csrf
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
import json

def index(request):
	branches = ["CSE", "MNC", "ECE", "EEE", "ME", "CE", "CL", "EP", "CST", "BT", "Physics", "Chemistry", "Mathematics", "Design", "Others"]
	
	btech_percent_placed = json.dumps({"Placed": len(Student.objects.filter(
		programs='B.Tech').filter(placed=True)), "Not placed": len(Student.objects.filter(programs='B.Tech').filter(placed=False))})
	mtech_percent_placed = json.dumps({"Placed": len(Student.objects.filter(
		programs='M.Tech').filter(placed=True)), "Not placed": len(Student.objects.filter(programs='M.Tech').filter(placed=False))})
	btech_all=Student.objects.filter(programs='B.Tech').filter(placed=True)
	mtech_all=Student.objects.filter(programs='M.Tech').filter(placed=True)
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
	comp_count_lis=[]
	comp_count_lis_mtech=[]
	for i in comp_counts:
		tmp={}
		if(i==""):
			continue
		tmp["tag"]=i
		tmp["weight"]=comp_counts[i]
		tmp["urlval"]=i.replace(' ','%20')
		
		comp_count_lis.append(tmp)
	for i in comp_counts_mtech:
		tmp={}
		if(i==""):
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
		num = len(Student.objects.filter(programs='B.Tech').filter(
		    branch__branchName=bch).filter(placed=True))
		den=(len(Student.objects.filter(programs='B.Tech').filter(branch__branchName=bch) ) )
		if(den==0):
			continue
		tmp["value"] = (num/den)*100
		
		btech_branchwise_placements.append(tmp)
	for bch in branches:
		tmp = {}
		tmp["group"] = bch
		num = len(Student.objects.filter(programs='M.Tech').filter(
		    branch__branchName=bch).filter(placed=True))
		den = (len(Student.objects.filter(
			programs='M.Tech').filter(branch__branchName=bch)))
		if(den == 0):
			continue
		tmp["value"] = (num/den)*100

		mtech_branchwise_placements.append(tmp)
	context = {"btech_percent_placed": btech_percent_placed, 
			"mtech_percent_placed": mtech_percent_placed,
            "btech_branchwise_placements": json.dumps(btech_branchwise_placements), 
			"mtech_branchwise_placements": json.dumps(mtech_branchwise_placements),
			"company_count":comp_count_lis,
			"company_count_mtech":comp_count_lis_mtech
			}

	print(context)
	return render(request, "home/stats.html",context )
