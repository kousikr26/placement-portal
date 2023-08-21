from home.models import Branch

def run():
    # Fetch all questions
    branches = ["ME", "CST", "Development Studies", "School of Agro and Rural Technology", "BT", "CL", "Petroleum Science and Technology", "Chemistry", "Physics", "Robotics and Artificial Intelligence", "Data Science", "ECE", "CE", "CSE", "Design", "EP", "Materials Science and Technology", "Environment Engineering", "Geotechnical Engineering", "Energy", "Mathematics", "EEE", "MNC", "Manufacturing Science & Engineering", "Aerodynamics & Propulsion", "E-Mobility", "Computational Mechanics", "Fluids and Thermal Engineering", "Machine Design", "Infrastructure Engineering & Management", "Transportation Systems Engineering", "Communication Engineering", "VLSI", "Power Engineering", "Systems control & automation", "Structural Engineering", "SPML", "Biotechnology", "RF & Photonics", "Water Resources Engineering & Management", "Earth Systems Science and Engineering", "Disaster Mangement and Risk Reduction", "Food Science and Technology"]
    for branch in branches:
        if not Branch.objects.filter(branchName=branch).exists():
            bran = Branch(branchName=branch)
            bran.save()