---
layout: blue_page
permalink: /cfp-committee/
title: Program Committee
---

<style>
.team {
  align-items: start;
}

.team li {
  flex: 0;
}

.team .name {
  font-size: 1.3em;
}

.team .links {
  display: block;
}

.team .links li {
  margin-right: .5em;
}

.team svg {
  width: 2em; height: 2em;
  vertical-align: -.33em;
}

.team p {
  max-width: 18em;
  font-size: .8em;
  max-height: 9em;
  overflow: hidden;
  text-overflow: ellipsis;

  margin-top: .4em;
}
</style>

RustFest {{ site.location.city }} has a dedicated Program Committe that will consist of RustFest organizers and community members. This ensures that voices from outside the conference organisers are heard during the selection process.

You want to speak at RustFest Barcelona?

<a class="button primary" href="https://cfp.rustfest.eu/events/rustfest-barcelona-2019">
Submit to the CfP
</a>

{% assign committee = site.people | where_exp: "person", "person.groups contains 'committee'" | sort: 'priority'  %}

<section>
  <ul class="team">
    {% for person in committee %}
        <li>
          {% include cards/cfp-person.html person=person %}
        </li>
    {% endfor %}
  </ul>
</section>

<!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
