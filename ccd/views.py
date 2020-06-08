from django.shortcuts import render, get_object_or_404
from django.contrib import messages
from django.http import HttpResponse,HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import redirect
from home.models import Student,Branch
from django.http import JsonResponse
from django.template.loader import render_to_string
from .forms import StudentForm
from django.db.models.functions import Lower
from django.contrib.auth.decorators import login_required,user_passes_test
from django.views.decorators.csrf import csrf_exempt
import json


def is_ccd_member(user):
    return user.is_superuser

# @login_required
# @user_passes_test(is_ccd_member)
def home(request):
    students = Student.objects.all().order_by('roll')
    branches = Branch.objects.all()
    for b in branches:
        print("{} : {}".format(b,b.pk))
    return render(request,'ccd/index.html',{'student_list':students})

@csrf_exempt
def ajax_update_database(request):
    context = dict()
    context['success']=False
    if request.is_ajax() and request.method=='POST':
        data = json.loads(request.body)
        update_type =data['update_type']
        # print(update_type)
        headings = data['headings']
        # print(headings)
        data_list = data['data_list']
        # print(data_list[:2])
        d = {    "Name":"name",
                 "Roll No.":"roll",
                 "Program":'programs',
                 "Branch":'branch_id',
                 "Day":'day',
                 "Company":'company',
                 "Placed":'placed',
                 "Sector":'sector',
                 "Profile":'profile',
                 "Slot":'slot',
                }

        if len(headings)==10:
            print(len(data_list))
            for i in range(len(data_list)):
                if(len(data_list[i])!=len(headings)):
                    print("list length error for row {}!".format(i+1))
                    pass
                else:
                    student_dict = {}
                    for h,val in zip(headings,data_list[i]):
                        if d[h]=="placed":
                            if val=="Not Placed":
                                student_dict['placed']=False
                            elif val=="Placed":
                                student_dict['placed'] = True
                        elif d[h]=="branch_id":
                            student_dict['branch_id'] = Branch.objects.get(branchName=val).id

                        else:
                            student_dict[d[h]]= val
                    if(student_dict['roll']==''):
                        pass
                    else:
                        # if i<5:
                        #     print(student_dict)
                        is_exist = Student.objects.filter(roll = student_dict['roll']).count()
                        if update_type=="1":
                            if is_exist:
                                obj= Student.objects.get(roll=student_dict['roll'])
                                obj.name = student_dict['name']
                                obj.programs = student_dict['programs']
                                obj.branch_id = student_dict['branch_id']
                                obj.day = student_dict['day']
                                obj.company = student_dict['company']
                                obj.placed = student_dict['placed']
                                obj.sector = student_dict['sector']
                                obj.profile = student_dict['profile']
                                obj.slot = student_dict['slot']
                                obj.save()
                        elif update_type=="2":
                            if not is_exist:
                                obj = Student.objects.create(**student_dict)
                        elif update_type=="3":
                            if is_exist:
                                obj= Student.objects.get(roll=student_dict['roll'])
                                obj.name = student_dict['name']
                                obj.programs = student_dict['programs']
                                obj.branch_id = student_dict['branch_id']
                                obj.day = student_dict['day']
                                obj.company = student_dict['company']
                                obj.placed = student_dict['placed']
                                obj.sector = student_dict['sector']
                                obj.profile = student_dict['profile']
                                obj.slot = student_dict['slot']
                                obj.save()
                            else:
                                obj = Student.objects.create(**student_dict)

            context['success']=True





    return JsonResponse(context)


# @login_required
# @user_passes_test(is_ccd_member)
def ajax_get_branch_options(request):
    data = dict()
    if request.method =='GET' and request.is_ajax():
        branches =Branch.objects.all()
        data['html_branch_options'] = render_to_string('ccd/partial_branch_options.html',{'branches':branches})
    return JsonResponse(data)

# @login_required
# @user_passes_test(is_ccd_member)
def ajax_filter(request):
    data = dict()
    if request.method == 'GET' and request.is_ajax():
        branch = request.GET.get('branch')
        placed = request.GET.get('placed')
        program = request.GET.get('program')
        sortid = request.GET.get('sortid')
        students = Student.objects.all()
        if branch!='all':
            branch = Branch.objects.get(branchName=branch)
            students = students.filter(branch=branch)
        if placed !='all':
            students = students.filter(placed=placed)
        if program!='all':
            students = students.filter(programs=program)
        students = students.order_by(Lower(sortid))
        data['html_student_list'] = render_to_string('ccd/partial_student_list.html',
                        {
                        'student_list':students
                        })

    return JsonResponse(data)

# @login_required
# @user_passes_test(is_ccd_member)
def save_student_form(request, form, template_name):
    if request.is_ajax():
        data = dict()
        if request.method == 'POST':
            if form.is_valid():
                form.save()
                data['form_is_valid'] = True
                # students = Student.objects.all()
                # data['html_student_list'] = render_to_string('ccd/partial_student_list.html',
                                # {
                                # 'student_list':students
                                # })
            else:
                data['form_is_valid'] = False

        context = {'form': form}
        data['html_form'] = render_to_string(template_name,
            context,
            request=request,
        )
        return JsonResponse(data)


# @login_required
# @user_passes_test(is_ccd_member)
def student_create(request):
    if request.is_ajax():
        if request.method == 'POST':
            form = StudentForm(request.POST)
        else:
            form = StudentForm()
        return save_student_form(request,form,'ccd/partial_student_create.html')


# @login_required
# @user_passes_test(is_ccd_member)
def student_update(request,pk):
    if request.is_ajax():
        student = get_object_or_404(Student,pk=pk)
        if request.method == 'POST':
            print("post student")
            form = StudentForm(request.POST,instance=student)
        else:
            print("get student")
            form = StudentForm(instance=student)
        return save_student_form(request,form,'ccd/partial_student_update.html')

# @login_required
# @user_passes_test(is_ccd_member)
def student_delete(request, pk):
    if request.is_ajax():
        student = get_object_or_404(Student, pk=pk)
        data = dict()
        if request.method == 'POST':
            student.delete()
            data['form_is_valid'] = True
            students = Student.objects.all()
            data['html_student_list'] = render_to_string('ccd/partial_student_list.html', {
                'student_list': students
            })
        else:
            context = {'student': student}
            data['html_form'] = render_to_string('ccd/partial_student_delete.html', context, request=request)
        return JsonResponse(data)


# # Sorting
# def ajax_sort(request):
#     data = dict()
#     if request.is_ajax():
#         if request.method == 'GET':
#             sortid = request.GET.get('sortid')
#             students = Student.objects.all().order_by(sortid)
#             data['html_student_list'] = render_to_string('ccd/partial_student_list.html', {
#                 'student_list': students
#             })
#             return JsonResponse(data)
