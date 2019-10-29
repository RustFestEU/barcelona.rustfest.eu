---
layout: session
permalink: /sessions/:name
type: talk
start: "12:30"
duration: "0:30"
day: saturday

speakers:
  - david-bach
  - malte-sandstede

title: Right inside the database

desc: >
    Modern, stateful web applications are increasingly dependent on high-frequency updates from multiple database systems.
    Each application maintains its own dynamic view of shared and private data.
    What if querying and synchronizing this state consistently was as simple as writing a Datalog query?

    Using a reactive query engine powered by differential computation built in Rust, we explore this question.
    We present a novel architecture that selectively and incrementally replicates state between server
    and application and thus allows you to develop as if you were sitting right inside of the database.

socialTwitterCardType: summary_large_image
socialImageSrc: /assets/social/right-inside-the-database.png
description: "What if querying and synchronizing state of a web application consistently was as simple as writing a Datalog query?"

public: true
---
