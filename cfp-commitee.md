---
layout: blue_page
permalink: /cfp-committee/
title: CFP Committee
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

RustFest {{ site.location.city }} has a dedicated CfP committee. This ensures that voices from outside the conference organisers are heard during the selection process.

You want to speak at RustFest Barcelona?

<a class="button primary" href="https://cfp.rustfest.eu/events/rustfest-barcelona-2019">
Submit to the CFP
</a>

{% assign committee = site.people | where_exp: "person", "person.groups contains 'committee'" | sort: 'priority'  %}

<section>
  <h2>CfP Team</h2>
  <p>We're currently assembling the CfP committee. It will consist of RustFest organizers & community members.</p>

  <ul class="team">
    {% for person in committee %}
        <li>
          {% include cards/cfp-person.html person=person %}
        </li>
    {% endfor %}
  </ul>
</section>
