from django.urls import path
from .views import create_poll, get_polls, vote, get_results

urlpatterns = [
    path('polls/', get_polls, name='get_polls'),
    path('polls/create/', create_poll, name='create_poll'),
    path('polls/<int:poll_id>/vote/', vote, name='vote'),
    path('polls/<int:poll_id>/results/', get_results, name='get_results'),
]
