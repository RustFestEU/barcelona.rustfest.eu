---
layout: blue_page
permalink: /about/
title: About
---

RustFest is Europe’s Rust-dedicated conference. The next edition of RustFest will take place as a two-day event in {{ site.location.city }}, {{ site.location.country }}.

We care about diversity and accessibility at this conference -- please take a look at our [Code of Conduct](/code-of-conduct/) and [Accessibility Statement](/accessibility/).

{% assign organizers = site.people | where_exp: "person", "person.groups contains 'organizer'" | sort: 'priority'  %}

<section>
  <h2>Team</h2>
  <ul class="team">
    {% for person in organizers %}
        <li>
          {% include cards/person.html person=person %}
        </li>
    {% endfor %}
  </ul>
</section>
