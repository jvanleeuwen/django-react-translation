import requests

from requests.exceptions import ConnectionError
from django.views.generic import TemplateView
from django.utils.translation import get_language
from django.utils.safestring import mark_safe
from django.urls import reverse

from .utils.memoize import memoize


@memoize
def react_render(language, path):
    data = {
        'language': language,
        'path': path,
    }

    try:
        r = requests.post('http://localhost:3010/', json=data)
        return mark_safe(r.text)
    except ConnectionError:
        return 'ERROR'


class IndexView(TemplateView):
    template_name = 'news/index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)

        language = get_language(),
        path = reverse('news:json-catalog'),

        context.update({
            'client': react_render(language, path),
        })

        return context
