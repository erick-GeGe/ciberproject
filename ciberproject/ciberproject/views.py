from django.http import HttpResponse

def index(request):
    return HttpResponse('Aqui deberia ir el proyecto')