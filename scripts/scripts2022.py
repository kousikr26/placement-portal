from home.models import Branch

def run():
    # Fetch all questions
    branches = ["CSE","MNC","ECE","EEE","ME","CE",'CL',"EP","CST","BT","Physics","Chemistry","Mathematics","Design","Others","Energy","Rural Technology", "DS", "E-Mobility"]
    for branch in branches:
        if not Branch.objects.filter(branchName=branch).exists():
            bran = Branch(branchName=branch)
            bran.save()