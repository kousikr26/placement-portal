from django.urls import path
from . import views
from django.views.generic import TemplateView

app_name = 'home'

urlpatterns = [
    path('charts', views.charts , name='charts'),
    path('dayCharts', views.dayCharts , name='dayCharts'),
    path('students', views.studentsList , name='students'),
    # path('changestatus', views.changestatus , name='changestatus'),
    # path('students/<int:student_id>', views.studentDetails , name='studentDetails'),
    path('search',views.search, name='search'),
    path('showStudent',views.showStudent, name='showStudent'),
    path('showStudent/name',views.showStudentByName, name='showStudentByName'),
    path('showStudent/programs',views.showStudentByProgram, name='showStudentByProgram'),
    path('showStudent/branch',views.showStudentByBranch, name='showStudentByBranch'),
    path('showStudent/roll',views.showStudentByRoll, name='showStudentByRoll'),
    path('showStudent/placed',views.showStudentByPlaced, name='showStudentByPlaced'),
    path('showStudent/company',views.showStudentByCompany, name='showStudentByCompany'),
    path('searchStudent',views.searchStudent,name='searchStudent'),
    path('searchStudentList',views.searchStudentList,name='searchStudentList'),
    path('branchlist',views.branchlist,name="branchlist"),
    path('branchlistshow',views.branchlistshow,name="branchlistshow")
]
