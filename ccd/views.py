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


def is_ccd_member(user):
    return user.is_superuser

# @login_required
# @user_passes_test(is_ccd_member)
def home(request):
    students = Student.objects.all().order_by('roll')

    return render(request,'ccd/index.html',{'student_list':students})

def ajax_update_database(request):
    data = dict()
    data['success']=False
    if request.is_ajax() and request.method=='GET':
        headings = request.GET.get('headings')
        print(headings)
        datalist = request.GET.get('data_list')
        print(headings)
        data['success']=True
    return JsonResponse(data)


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
