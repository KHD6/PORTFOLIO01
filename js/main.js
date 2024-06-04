$(document).ready(function(){//시작

  //GASP 시작
   const horizontal = document.querySelector("#horizontal");
   const sections = gsap.utils.toArray("#horizontal > section");

   let scrollTween = gsap.to(sections, {
       xPercent: -100 * (sections.length -1),
       ease: "none",
       scrollTrigger: {
           trigger: horizontal,
           start: "top top",
           end: () => "+=" + (horizontal.offsetWidth - innerWidth),
           pin: true,
           ainicipatePin: 1,
           scrub: 1,
           invalidateOnRefresh: true
        }
    });
  
  //GASP 끝

  //Visual 동작 시작

/*Main variables*/
  var content = [{
    title: [["<span>DESIGN</span><br>"]],
    desc: [["<span>PORTFOLIO</span>"]]
  }, {
    title: "Let Me Introudce My Self",
    desc: ""
  }, {
    title: "HTML",
    desc: "CSS"
  }, {
    title: "j-Query",
    desc: "Figma"
  }, {
    title: "Photoshop",
    desc: "Illustrator"
  }, {
    title: "Premiere_Pro",
    desc: "After_Effects"
  }];
  var currentPage = 0;
  //generate content
  for (var i = 0; i < content.length; i++) {
    //split content letters to array
    for (var obj in content[i]) {
      //if string
      if (typeof content[i][obj] === "string") {
        content[i][obj] = content[i][obj].split("");
        continue;
      }
      //if array (grouped text)
      else if (typeof content[i][obj] === "object") {
        var toPush = [];
        for(var j = 0; j < content[i][obj].length; j++) {
          for(var k = 0; k < content[i][obj][j].length; k++) {
            toPush.push(content[i][obj][j][k]);
          }
        }
        content[i][obj] = toPush;
      }
    }
    //set text to 
    $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
    setText();
    //clone to data
    $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
    setText();
  }
  //initial arrangement
  arrangeCurrentPage();
  scrambleOthers();
  /*
  * Event handlers
  */
  $(window).resize(function() {
    arrangeCurrentPage();
    scrambleOthers();
  });
  $("#soup-prev").hide();
  $("#soup-prev").click(function() {
    $("#soup-next").show();
    currentPage--;
    if (currentPage === 0) {
      $("#soup-prev").hide();
    }
    arrangeCurrentPage();
    scrambleOthers();
  });
  $("#soup-next").click(function() {
    $("#soup-prev").show();
    currentPage++;
    if (currentPage === content.length - 1) {
      $("#soup-next").hide();
    }
    arrangeCurrentPage();
    scrambleOthers();
  });
  /*
  * Functions
  */
  function arrangeCurrentPage() {
    for (var i = 0; i < content[currentPage].title.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
        left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
        top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
        color: "#fff",
        zIndex: 9001
      });
    }
    for (var i = 0; i < content[currentPage].desc.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
        left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
        top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
        color: "#fff",
        zIndex: 9001
      });
    }
  }

  function setText() {
    var j;
    for (j = 0; j < content[i].title.length; j++) {
      $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
    }
    for (j = 0; j < content[i].desc.length; j++) {
      $(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
    }
  }

  function scrambleOthers() {
    for (var i = 0; i < content.length; i++) {
      //don't scramble currentPage
      if (currentPage === i)
        continue;
      var parts = [
        ["title", ".soup-title"],
        ["desc", ".soup-desc"]
      ];
      //apply to .title h1s and .desc ps
      for (var j = 0; j < parts.length; j++) {
        for (var k = 0; k < content[i][parts[j][0]].length; k++) {
          //define random position on screen
          var randLeft = Math.floor(Math.random() * $(window).width());
          var randTop = Math.floor(Math.random() * $(window).height());
          //defining boundaries
          var offset = $(".position-data").eq(currentPage).offset();
          var bounds = {
            left: offset.left,
            top: offset.top,
            right: $(window).width() - offset.left,
            bottom: $(window).height() - offset.top
          };
          var middleX = bounds.left + $(".position-data").eq(currentPage).width() / 4;
          var middleY = bounds.top + $(".position-data").eq(currentPage).height() / 4;
          //finally, apply all the scrambles
          $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
            left: randLeft,
            top: randTop,
            color: "#222",
            zIndex: "initial"
          });
        }
      }
    }
  }

  /*나타내기 시작*/
  const hide = (item) => {
    gsap.set(item, {autoAlpha: 0});
}

const animate = (item) => {
    let x = 0;
    let y = 0;
    let delay = item.dataset.delay;

    if(item.classList.contains("reveal_LTR")){
        x = -100,
        y = 0
    } else if(item.classList.contains("reveal_BTT")){
        x = 0,
        y = 100
    } else if(item.classList.contains("reveal_TTB")){
        x = 0,
        y = -100
    } else {
        x = 100,
        y = 0;
    }

    gsap.fromTo(item, 
        {autoAlpha: 0, x: x, y: y}, 
        {autoAlpha: 1, x: 0, y: 0, delay: delay, duration: 1.25, overwrite: "auto", ease: "expo"}
    );
};

gsap.utils.toArray(".reveal").forEach(item => {
    hide(item);

    ScrollTrigger.create({
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        markers: false,
        onEnter: () => {animate(item)}
    });
});
});//끝