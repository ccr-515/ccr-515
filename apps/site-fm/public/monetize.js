
(function(){
  "use strict";
  var email = "515.ux.design@gmail.com";

  function byId(id){ return document.getElementById(id); }
  function paidLink(context){
    var subject = context ? "515 Quick Site — " + context : "515 Quick Site inquiry";
    var idea = byId("prompt") ? byId("prompt").value.trim() : "";
    var body = "Hi Camilo,\n\nI want to start a $499 515 Quick Site.\n\n";
    if(context) body += "SITE/FM concept: " + context + "\n";
    if(idea) body += "My idea: " + idea + "\n";
    body += "\nBusiness / project name:\nCurrent website, if any:\nWhat I need the site to do:\nBest way to reach me:\n\nThanks";
    window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  var heroTitle = document.querySelector(".hero h1");
  if(heroTitle) heroTitle.innerHTML = "Describe it.<br><em>See it.</em> Ship it<span class='lime'>.</span>";

  var heroCopy = document.querySelector(".hero p");
  if(heroCopy) heroCopy.innerHTML = "One sentence is enough. Get a website direction, keep the HTML, or hand it to 515 to finish.";

  var composerTitle = document.querySelector(".composer-top h2");
  if(composerTitle) composerTitle.innerHTML = "What do you need a website for?";

  var prompt = byId("prompt");
  if(prompt) prompt.placeholder = "A neighborhood coffee shop that needs a cleaner menu, hours, map, and one obvious way to visit…";

  var chips = document.createElement("div");
  chips.id = "simple-chips";
  [
    ["Restaurant","A neighborhood restaurant that needs a cleaner mobile menu, hours, map, and one clear call to action."],
    ["Barber / salon","A barber or salon that needs services, pricing, booking, hours, and a strong mobile-first look."],
    ["Portfolio","An independent artist or designer portfolio with selected work, a short story, and one clear contact path."]
  ].forEach(function(item){
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = item[0];
    b.addEventListener("click",function(){ prompt.value = item[1]; prompt.dispatchEvent(new Event("input")); prompt.focus(); });
    chips.appendChild(b);
  });
  if(prompt) prompt.insertAdjacentElement("afterend",chips);

  var composer = byId("composer");
  if(composer){
    var offer = document.createElement("section");
    offer.id = "quick-offer";
    offer.innerHTML =
      "<div class='quick-top'>" +
        "<div><div class='quick-eyebrow'>515 QUICK SITE</div><h2>Want the finished site instead?</h2></div>" +
        "<div class='quick-price'><strong>$499</strong><span>FIXED SETUP</span><small>Optional ongoing care<br>$39 / month</small></div>" +
        "<div class='quick-copy'><p>Skip the builder. I use the private 515 Site Engine behind the scenes and turn your rough idea into the actual site plan, copy direction, visual direction, build checklist, and launch handoff.</p>" +
        "<ul><li>Mobile-first one-page build</li><li>Calls, booking, menu, map, or contact path</li><li>Copy and visual cleanup</li><li>Launch-ready handoff</li></ul>" +
        "<div class='quick-actions'><button class='quick-primary' id='quick-paid'>Start a $499 build ↗</button><a class='quick-link' href='https://www.ccr515.com/contact' target='_blank' rel='noopener'>See the CCR515 build path</a></div></div>" +
      "</div>" +
      "<div class='quick-note'><span>SITE/FM is the sampler.</span><span>The 515 Site Engine stays private and powers the paid production work.</span></div>";
    composer.insertAdjacentElement("afterend",offer);
    byId("quick-paid").addEventListener("click",function(){ paidLink(""); });
  }

  var galleryEyebrow = byId("gallery-eyebrow");
  if(galleryEyebrow) galleryEyebrow.textContent = "THREE STARTING POINTS";
  var galleryTitle = byId("gallery-title");
  if(galleryTitle) galleryTitle.innerHTML = "Don’t overthink it<span class='lime'>.</span>";

  var gallerySection = document.querySelector(".gallery-section");
  if(gallerySection){
    var how = document.createElement("section");
    how.id = "simple-how";
    how.innerHTML =
      "<div class='simple-how-head'><span>FROM PROMPT TO PAID BUILD</span><h2>Three moves.</h2></div>" +
      "<div class='simple-steps'>" +
        "<article class='simple-step'><b>01</b><h3>Say what you need.</h3><p>Write it like you would text a person. No design vocabulary required.</p></article>" +
        "<article class='simple-step'><b>02</b><h3>See a direction.</h3><p>Preview the concept on desktop or phone. Keep the HTML if that is enough.</p></article>" +
        "<article class='simple-step'><b>03</b><h3>Hand it to 515.</h3><p>If you want it finished, the idea becomes a paid Quick Site and moves into my private production engine.</p></article>" +
      "</div>";
    gallerySection.insertAdjacentElement("afterend",how);
  }

  var preview = byId("preview-dialog");
  if(preview){
    var money = document.createElement("div");
    money.id = "money-preview";
    money.innerHTML =
      "<div class='money-preview-copy'><span>WANT THIS FINISHED?</span><strong>Turn this concept into a real 515 Quick Site for $499.</strong><small>Optional $39/month care after launch.</small></div>" +
      "<button class='money-preview-button' id='finish-with-515'>Have 515 finish this ↗</button>";
    var remixPanel = preview.querySelector(".remix-panel");
    if(remixPanel) remixPanel.insertAdjacentElement("beforebegin",money);
    else preview.appendChild(money);
    byId("finish-with-515").addEventListener("click",function(){
      var title = byId("preview-title");
      paidLink(title ? title.textContent : "");
    });
  }

  var topNew = byId("new-site");
  if(topNew) topNew.textContent = "Start a site +";
})();
