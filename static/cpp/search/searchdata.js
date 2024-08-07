var indexSectionsWithContent =
{
  0: "abcdefghiklmnoprstuv",
  1: "e",
  2: "g",
  3: "defgilmnorstuw",
  4: "abcdefgiklmnoprstuv"
};

var indexSectionNames =
{
  0: "all",
  1: "classes",
  2: "namespaces",
  3: "functions",
  4: "variables"
};

var indexSectionLabels =
{
  0: "All",
  1: "Classes",
  2: "Namespaces",
  3: "Functions",
  4: "Variables"
};

var index =
[
  { section: "Functions", name: "init_dora_node", url: "#init_dora_node" },
  { section: "Functions", name: "next_event", url: "#next_event" },
  { section: "Functions", name: "dora_events_into_combined", url: "#dora_events_into_combined" },
  { section: "Functions", name: "empty_combined_events", url: "#empty_combined_events" },
  { section: "Functions", name: "send_output", url: "#send_output" },
  { section: "Functions", name: "event_type", url: "#event_type" },
  { section: "Functions", name: "event_as_input", url: "#event_as_input" },
  { section: "Classes", name: "DoraNode", url: "#DoraNode" },
  { section: "Classes", name: "DoraEvent", url: "#DoraEvent" },
  { section: "Classes", name: "OutputSender", url: "#OutputSender" },
  { section: "Classes", name: "Events", url: "#Events" },
  { section: "Classes", name: "CombinedEvents", url: "#CombinedEvents" },
  { section: "Classes", name: "MergedEvents", url: "#MergedEvents" },
  { section: "Classes", name: "MergedDoraEvent", url: "#MergedDoraEvent" }
];

function createIndex() {
  var list = document.getElementById("searchBox").querySelector("ul");
  for (var i = 0; i < index.length; i++) {
    var item = document.createElement("li");
    var link = document.createElement("a");
    link.href = index[i].url;
    link.textContent = index[i].name;
    item.appendChild(link);
    list.appendChild(item);
  }
}

window.onload = function() {
  createIndex();
};
