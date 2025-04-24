from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Poll, Option, Vote

@csrf_exempt
def create_poll(request):
    if request.method == "POST":
        data = json.loads(request.body)
        question = data.get("question")
        options = data.get("options", [])

        if not question or not options:
            return JsonResponse({"error": "Question and options are required."}, status=400)

        poll = Poll.objects.create(question=question)
        for option_text in options:
            Option.objects.create(poll=poll, text=option_text)

        return JsonResponse({"message": "Poll created successfully."})

    return JsonResponse({"error": "Only POST requests are allowed."}, status=405)

def get_polls(request):
    polls = Poll.objects.all().values()
    result = []
    for poll in polls:
        options = list(Option.objects.filter(poll_id=poll["id"]).values())
        result.append({"id": poll["id"], "question": poll["question"], "options": options})
    return JsonResponse(result, safe=False)

@csrf_exempt
def vote(request, poll_id):
    if request.method == "POST":
        data = json.loads(request.body)
        poll = Poll.objects.get(id=poll_id)
        option = Option.objects.get(id=data["option_id"])
        Vote.objects.create(poll=poll, option=option, user=data["user"])
        return JsonResponse({"message": "Vote recorded"}, status=201)

def get_results(request, poll_id):
    options = Option.objects.filter(poll_id=poll_id)
    results = {opt.text: opt.votes.count() for opt in options}
    return JsonResponse(results)

@csrf_exempt
def delete_poll(request, poll_id):
    if request.method == "DELETE":
        try:
            poll = Poll.objects.get(id=poll_id)
            poll.delete()
            return JsonResponse({"message": "Poll deleted"}, status=200)
        except Poll.DoesNotExist:
            return JsonResponse({"error": "Poll not found"}, status=404)
