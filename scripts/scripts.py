from home.models import Branch

def run():
    # Fetch all questions
    branches = ["CSE", "MNC", "EE", "ME", "CE", "CL", "EP", "CST", "BT", "DS","Physics", "Chemistry", "Mathematics", "Design", "Others", "School of Agro and Rural Technology", "Centre for Intelligent Cyber Physical Systems", "Interdisciplinary", "School of Energy Science and Engineering", "Centre for Disaster Management and Research"]
    for branch in branches:
        if not Branch.objects.filter(branchName=branch).exists():
            bran = Branch(branchName=branch)
            bran.save()