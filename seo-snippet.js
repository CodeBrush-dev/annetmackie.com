// Single-file SEO snippet (CONFIG + META_DATA + LD_DATA + runtime)

(function () {
  "use strict";


  const CONFIG = {
    baseUrlFallback: "https://www.annetmackie.com",
    googleSiteVerification: ""
  };

  // === DATA (from your previous meta-tags.js) ===
  const META_DATA = {"meta_tags_list":[{"page_url":"https://www.annetmackie.com/","title_tag":"Concept Art, Matte Painting, Film Illustrations | Annet Mackie","meta_description":"Film and TV concept art, matte painting and illustrations by Sydney-based artist Annet Mackie. Feature films, TV series and suncatcher art portfolio."},{"page_url":"https://www.annetmackie.com/three-thousand-years-of-longing","title_tag":"Three Thousand Years of Longing Concept Art | Annet Mackie","meta_description":"Film illustrations and concept art for Three Thousand Years of Longing by concept artist Annet Mackie. Feature film visual development and design."},{"page_url":"https://www.annetmackie.com/concept-art---the-great-gatsby","title_tag":"The Great Gatsby Concept Art, Baz Luhrmann | Annet Mackie","meta_description":"Concept art and film illustrations for Baz Luhrmann’s The Great Gatsby by Annet Mackie. Feature film visual development and costume design references."},{"page_url":"https://www.annetmackie.com/true-history-of-the-kelly-gang","title_tag":"True History of the Kelly Gang Concept Art | Annet Mackie","meta_description":"Feature film concept art and illustrations for True History of the Kelly Gang by Annet Mackie. Film visuals, environments and character-focused artwork."},{"page_url":"https://www.annetmackie.com/the-chronicles-of-narnia-the-voyage-of-","title_tag":"Concept Art for The Chronicles of Narnia Film | Annet Mackie","meta_description":"Concept art for The Chronicles of Narnia: The Voyage of the Dawn Treader by Annet Mackie. Film illustrations and fantasy environment visuals."},{"page_url":"https://www.annetmackie.com/slideshow","title_tag":"The Pacific HBO Series Concept Art | Annet Mackie","meta_description":"TV series concept art and film illustrations for HBO’s The Pacific by Annet Mackie. Visual development and keyframe illustrations for television."},{"page_url":"https://www.annetmackie.com/suncatcher","title_tag":"Suncatcher Art & Film Concept Art | Annet Mackie","meta_description":"Suncatcher art series and film concept art by Annet Mackie. Friendship, rivalry and character-driven visual storytelling in illustration and design."},{"page_url":"https://www.annetmackie.com/harry-potter-and-the-deathly-hallows-par","title_tag":"Harry Potter Matte Painting, Film Illustrations | Annet Mackie","meta_description":"Matte painting and film illustrations for Harry Potter and the Deathly Hallows: Part 1 by Annet Mackie. Feature film environments and VFX shots."},{"page_url":"https://www.annetmackie.com/knowing","title_tag":"Concept Art & Matte Painting for Knowing | Annet Mackie","meta_description":"Concept art and matte painting work for the feature film Knowing by Annet Mackie. Film illustrations, environments and visual effects artwork."}],"keywords":["concept art","the great gatsby","three thousand years of longing","matte painting","film illustrations","costume design","baz luhrmann","harry potter","suncatcher art","tv series concept art"]};

  // === DATA (from your previous LD.js) ===
  const LD_DATA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.annetmackie.com/#person",
  "name": "Annet Mackie",
  "url": "https://www.annetmackie.com/",
  "description": "Concept art and previsualization for film and TV based in Sydney, NSW, Australia. Portfolio includes work on feature films and TV series such as Three Thousand Years of Longing, The Great Gatsby, True History of the Kelly Gang, The Chronicles of Narnia: The Voyage of the Dawn Treader, The Pacific (HBO), Suncatcher, Harry Potter and the Deathly Hallows: Part 1, Knowing, The Last Dragon, and xXx3: Return of Xander Cage.",
  "jobTitle": "Concept Artist",
  "sameAs": [],
  "worksFor": {
    "@type": "Organization",
    "name": "Annet Mackie Concept Art",
    "url": "https://www.annetmackie.com/"
  },
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Concept Artist",
    "description": "Concept art and previsualization for film and television productions.",
    "occupationLocation": {
      "@type": "City",
      "name": "Sydney, NSW, Australia"
    }
  },
  "knowsAbout": [
    "Concept Art",
    "Previsualization",
    "Matte Painting",
    "Feature Film",
    "Television Series",
    "Costume Concept Art",
    "Visual Development"
  ],
  "image": [
    "https://static.wixstatic.com/media/e80eff_6363b4927da74add902a4626555463c8f000.jpg/v1/fill/w_979,h_551,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e80eff_6363b4927da74add902a4626555463c8f000.jpg"
  ],
  "subjectOf": [
    {
      "@type": "WebPage",
      "@id": "https://www.annetmackie.com/#homepage",
      "url": "https://www.annetmackie.com/",
      "name": "Annet Mackie Concept Art | Previsualization for Film and TV | Sydney NSW, Australia",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.annetmackie.com/#website",
        "url": "https://www.annetmackie.com/",
        "name": "Annet Mackie Concept Art"
      }
    }
  ]
};

  /* ===== Helpers ===== */
  function clamp(str, max) {
    if (typeof str !== "string") str = String(str ?? "");
    return str.length <= max ? str : str.slice(0, Math.max(0, max - 1)) + "…";
  }

  function stripTrailingSlash(p) {
    if (!p) return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function normalizePathFromUrl(url) {
    try {
      const u = new URL(url);
      return stripTrailingSlash(u.pathname || "/");
    } catch {
      const m = String(url || "").match(/^https?:\/\/[^/]+(\/[^?#]*)?/i);
      return stripTrailingSlash((m && m[1]) || "/");
    }
  }

  function removeLangPrefix(pathname) {
    const m = String(pathname || "/").match(
      /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)(.*)$/
    );
    if (!m) return pathname || "/";
    const rest = stripTrailingSlash(m[2] || "/");
    return rest || "/";
  }

  function currentPagePath() {
    const path = window.location.pathname || "/";
    return stripTrailingSlash(path || "/");
  }

  function currentKeyCandidates() {
    const path = currentPagePath();
    const origin = (window.location.origin || "").replace(/\/$/, "");
    const full = origin + path;

    if (path === "/") {
      return [full, "/"];
    }

    const noLang = removeLangPrefix(path);
    return [full, path, stripTrailingSlash(path), noLang, stripTrailingSlash(noLang)];
  }

  function buildIndex(metaJson) {
    const list = (metaJson && metaJson.meta_tags_list) || [];
    const index = {};
    for (const item of list) {
      const path = normalizePathFromUrl(item.page_url);
      let origin = "";
      try {
        origin = new URL(item.page_url).origin;
      } catch {
        origin = "";
      }
      const full = origin ? origin.replace(/\/$/, "") + path : "";

      const entry = {
        title: item.title_tag || "",
        description: item.meta_description || "",
      };

      index[path] = entry;
      index[stripTrailingSlash(path)] = entry;
      if (full) index[full] = entry;
    }
    return index;
  }

  function _stripQuotes(s) {
    return String(s ?? "")
      .replace(/["'“”‘’„«»]/g, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s\-–—·,;:]+|[\s\-–—·,;:]+$/g, "")
      .trim();
  }

  function normalizeKeywordsList(input, opts) {
    const { maxKeywords = 20 } = opts || {};
    if (input == null) return [];
    let items = Array.isArray(input)
      ? input.slice()
      : typeof input === "string"
      ? input.split(",")
      : [];
    const seen = new Set();
    return items
      .map(_stripQuotes)
      .filter((s) => s && s.length >= 2)
      .filter((s) => {
        const k = s.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, maxKeywords);
  }

  function normalizeKeywords(input, opts) {
    const { maxKeywords = 20, maxLength = 280 } = opts || {};
    const list = normalizeKeywordsList(input, { maxKeywords });
    const content = list.join(", ");
    return content.length > maxLength ? content.slice(0, maxLength) : content;
  }

  function applyAltFallbacks(keywordsPool) {
    if (!Array.isArray(keywordsPool) || keywordsPool.length === 0) return;
    try {
      const images = Array.from(document.querySelectorAll("img"));
      let i = 0;
      images.forEach((img) => {
        const curAlt = (img.getAttribute("alt") || "").trim().toLowerCase();
        const shouldReplace =
          !curAlt ||
          curAlt.endsWith(".jpg") ||
          curAlt.endsWith(".png") ||
          curAlt === "image" ||
          curAlt === "img";
        if (shouldReplace) {
          img.setAttribute("alt", keywordsPool[i % keywordsPool.length]);
          i++;
        }
      });
    } catch {
      /* ignore */
    }
  }

  function optimizeImages() {
    try {
      const images = Array.from(document.querySelectorAll("img"));
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              io.unobserve(img);
              // hook for tracking / lazy work if needed
            }
          });
        });
        images.forEach((img, index) => {
          if (index > 0) io.observe(img);
        });
      }
    } catch (err) {
      console.error("Image optimization error:", err);
    }
  }

  function upsertMeta(nameOrProperty, content, useProperty) {
    const selector = useProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (useProperty) el.setAttribute("property", nameOrProperty);
      else el.setAttribute("name", nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }

  function injectJsonLd(ldObject) {
    if (!ldObject) return;
    try {
      const existing = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      existing.forEach((el) => {
        el.parentNode.removeChild(el);
      });

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(ldObject);
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error injecting JSON-LD:", err);
    }
  }

  function applyJsonLd() {
    injectJsonLd(LD_DATA);
  }

  function applySeoFromJson() {
    try {
      const metaJson = META_DATA;
      const index = buildIndex(metaJson);

      const path = currentPagePath();
      const isHome = path === "/";

      const fallbackBase =
        (CONFIG && CONFIG.baseUrlFallback) ? CONFIG.baseUrlFallback : "";
      const baseUrl = (window.location.origin || fallbackBase).replace(/\/$/, "");
      const canonicalUrl = baseUrl + path;

      const keys = currentKeyCandidates();
      let entry = null;
      for (const k of keys) {
        if (index[k]) {
          entry = index[k];
          break;
        }
      }

      if (!entry) {
        return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
      }

      const title = clamp(entry.title, 60);
      const desc = clamp(entry.description, 185);

      document.title = title;

      const metaList = [
        { type: "name", key: "description", content: desc },
        { type: "property", key: "og:url", content: canonicalUrl },
        { type: "name", key: "resource-hints", content: "preload" },
        { type: "name", key: "format-detection", content: "telephone=yes" },
        { type: "name", key: "mobile-web-app-capable", content: "yes" },
        { type: "name", key: "apple-mobile-web-app-capable", content: "yes" },
      ];

      // opcjonalnie dodaj google-site-verification, jeśli jest w CONFIG
      if (CONFIG && CONFIG.googleSiteVerification) {
        metaList.push({
          type: "name",
          key: "google-site-verification",
          content: CONFIG.googleSiteVerification
        });
      }

      if (isHome && metaJson && metaJson.keywords) {
        const kwContent = normalizeKeywords(metaJson.keywords, {
          maxKeywords: 25,
          maxLength: 512,
        });
        if (kwContent) {
          metaList.push({ type: "name", key: "keywords", content: kwContent });
        }
      }

      metaList.forEach((m) => {
        upsertMeta(m.key, m.content, m.type === "property");
      });

      upsertLink("canonical", canonicalUrl);

      return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
    } catch (err) {
      console.error("Error meta settings:", err);
      return [];
    }
  }

  function initSnippetSEO() {
    const keywordsPool = applySeoFromJson();
    const path = currentPagePath();
    if (path === "/") {
      applyJsonLd();
    }
    optimizeImages();
    applyAltFallbacks(keywordsPool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnippetSEO);
  } else {
    initSnippetSEO();
  }
})();
