#!/usr/bin/env python3
"""compile_products.py — every product, platform and site of the estate in one file the site renders
(content/products.json), each with a screenshot of its live home page (public/shots/<slug>.webp).

Sources, in order of authority:
  1. the CV written for the Anthropic residency (myinfrastructure projects/mycv, 2026-11-03, every claim sourced):
     what was built in-house and how — IN_HOUSE below, its words;
  2. the estate's catalogue of live pages (myinfrastructure command-center/brochure/brochure-data-catalogue.json,
     read from each page on 2026-10-11): names, descriptions, how-it-works steps, benefits;
  3. the Ecosystem waffle (cloud.autogineer.com/ecosystem.js): which products are in the shared launcher, its groups.
Screenshots: scripts/shot.mjs drives the system Chrome over the DevTools protocol at 1440 x 900 (the real clock, the network
quiet, consent banners hidden), each saved as a 1200 px WebP; a site that does not answer keeps its last screenshot (or
none).

    /tmp/book-venv/bin/python scripts/compile_products.py [--no-shots] [--phones] [--only slug,slug]
"""
import concurrent.futures as cf
import io
import json
import os
import re
import subprocess
import sys
import urllib.request

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
INFRA = os.path.expanduser("~/Downloads/myinfrastructure")
CATALOGUE = os.path.join(INFRA, "command-center/brochure/brochure-data-catalogue.json")
WAFFLE = "https://cloud.autogineer.com/ecosystem.js"
SHOTS = os.path.join(SITE, "public", "shots")
PHONES = os.path.join(SHOTS, "phone")
OUT = os.path.join(SITE, "content", "products.json")

# what was designed and built in-house, in the CV's own words (sourced claims only)
IN_HOUSE = {
    "autogineer.com": ("AutoGineer", "AI agents & automation",
        "An AI-automation marketplace: identity-verified experts, Stripe Connect escrow and 10,757 n8n workflow templates. Next.js 15 and React 19, Socket.IO, 730 tests; a React Native (Expo) app live on Google Play.",
        ["Next.js 15", "React 19", "Socket.IO", "Stripe Connect", "React Native (Expo)"]),
    "cloud.autogineer.com": ("Autogineer Cloud", "Cloud & hosting",
        "VPS hosting: pick a plan and a one-click app (WordPress, n8n, Supabase and more) and it is live in seconds. Automated provisioning, Stripe subscriptions and a reseller programme, with paying customers.",
        ["Provisioning automation", "Stripe Billing", "Proxmox", "Docker"]),
    "tennet.io": ("Tennet.io", "AI agents & automation",
        "AI-powered collaborative development teams: AI agents plan and build apps together, designed for people to steer them mid-run. Node and TypeScript, React, Python (CrewAI, LiteLLM) and an HMAC-signed event bus. Its 703 passing tests mocked the very components they tested; the agent loop was restored and acceptance moved to real-browser journeys — about 5,500 automated tests across five services now.",
        ["TypeScript", "Node.js", "React", "Python", "CrewAI", "LiteLLM"]),
    "claude.cabscloud.com": ("Claude Command Center", "AI agents & automation",
        "An AI command center for SEO, blogs and ads, on an LLM gateway that runs Claude Code headless on AWS Bedrock with a 109-skill library and named sub-agents, metered by per-model credits under daily token caps; Gemini added through an Anthropic-to-Gemini translating proxy.",
        ["Claude Code", "AWS Bedrock", "Gemini", "Next.js"]),
    "contengine.pro": ("Content Engine", "Content & video",
        "AI content automation that queries several models at once, scores recommendations by cross-model agreement and checks claims against sources before publishing; web and React Native apps, moved from Railway to self-hosted Coolify.",
        ["Multi-model LLMs", "React Native", "Coolify"]),
    "reelforge.cabscloud.com": ("ReelForge", "Content & video",
        "A brief becomes a readable shot plan, then a finished vertical video with sound, captions and logo; 32 styles plus a GPU Generative Engine with a self-hosted open-weight talking-avatar model on an H100.",
        ["GPU rendering", "LongCat-Video-Avatar", "n8n"]),
    "forge.storeswiki.com": ("ChannelForge", "Content & video",
        "Faceless channels that run themselves: ChannelForge researches the niche, builds the brand, animates original episodes on cloud GPUs and publishes them on schedule to YouTube, Facebook, Instagram, TikTok, X, Threads, LinkedIn and Bluesky, with a quality critic on every video.",
        ["Next.js", "Python", "Cloud GPUs", "Claude on Bedrock", "Cloud SQL"]),
    "channels.storeswiki.com": ("StoresWiki Channels", "Media & publishing",
        "Every channel of the network on YouTube, Facebook and Instagram, ranked by followers and views and counted every hour — fed by the original programme, ChannelForge and the Unpacked Commentary Engine, an n8n + GPU engine producing avatar commentary, explainer and news episodes in 11 formats.",
        ["Next.js", "Hourly feed", "n8n", "GPUs"]),
    "dossier.storeswiki.com": ("Autonomous Video Studios — the dossier", "Media & publishing",
        "The book of the two autonomous video systems — the original programme and ChannelForge: design, operations, results and economics, every figure measured; a web edition with every chart live, and the PDF.",
        ["Next.js", "ReportLab", "Interactive SVG charts"]),
    "youtubepro.cabscloud.com": ("YouTube Pro", "Content & video",
        "A YouTube research, idea, script and thumbnail toolkit (NestJS and Next.js) with built-in metrics and self-monitoring; 15 defects were planted in its monitoring tests to test the tests.",
        ["NestJS", "Next.js", "YouTube Data API"]),
    "tunes.cabscloud.com": ("AvatarTunes", "Content & video",
        "A topic or a song becomes a scripted, voiced, lip-synced AI avatar video; moved from Vercel and Railway to self-hosted Coolify.",
        ["Avatar video", "Voice synthesis", "Coolify"]),
    "oc.cabscloud.com": ("Organized Chaos", "Productivity & business",
        "Upload PDF, DOCX or PPTX and AI builds a searchable documentation portal (React front end, Node API, MinIO object storage).",
        ["React", "Node.js", "MinIO"]),
    "lead.cabscloud.com": ("LeadGen", "Marketing & SEO",
        "Lead-generation SaaS: find local businesses, audit their sites (40+ checks), write the AI pitch and track outreach (decoupled front end and back end, moved from Railway).",
        ["React", "Node.js", "AI pitch writing"]),
    "tickets.cabscloud.com": ("Support & tickets", "Developer & internal platforms",
        "Centralized ticketing for every product, with HMAC-signed portal links and one shared support launcher on all the sites.",
        ["HMAC signing", "Node.js"]),
    "agents.storeswiki.com": ("Paperclip agent control plane", "Developer & internal platforms",
        "A self-hosted agent control plane with 118 configured agents and 199 skills. Its Telegram concierge went from 33–146 s to 9.5–16.3 s a reply and from $0.39 to about $0.015 a message once the time and the money were measured.",
        ["Paperclip", "Claude", "Haiku 4.5", "Telegram"]),
    "agentforge.cabscloud.com": ("AgentForge", "AI agents & automation",
        "A master agent that builds agents, on a self-hosted Dify engine with a custom orchestration API (research and development).",
        ["Dify", "Orchestration API"]),
}
IN_HOUSE_ALIASES = {"app.agentforge.cabscloud.com": "agentforge.cabscloud.com", "enterprise.storeswiki.com": "agents.storeswiki.com",
                    "membership.cabscloud.com": None}

# what the catalogue lacks: in-house products and sites with no captured page
EXTRA = {
    "tennet.io": {"name": "Tennet.io", "url": "https://tennet.io"},
    "forge.storeswiki.com": {"name": "ChannelForge", "url": "https://forge.storeswiki.com"},
    "dossier.storeswiki.com": {"name": "Autonomous Video Studios — the dossier", "url": "https://dossier.storeswiki.com"},
    "tickets.cabscloud.com": {"name": "Support & tickets", "url": "https://tickets.cabscloud.com"},
    "mart.storeswiki.com": {"name": "StoresWiki Mart", "url": "https://mart.storeswiki.com",
        "description": "A multi-vendor super-app: the storefront of the StoresWiki commerce ecosystem."},
    "shop.storeswiki.com": {"name": "StoresWiki Shop", "url": "https://shop.storeswiki.com", "description": "An online shop in the StoresWiki commerce ecosystem."},
    "services.storeswiki.com": {"name": "StoresWiki Services", "url": "https://services.storeswiki.com", "description": "A services marketplace in the StoresWiki commerce ecosystem."},
    "app-grocery.storeswiki.com": {"name": "StoresWiki Grocery", "url": "https://app-grocery.storeswiki.com", "description": "Grocery ordering and delivery in the StoresWiki commerce ecosystem."},
    "app-restaurant.storeswiki.com": {"name": "StoresWiki Restaurant", "url": "https://app-restaurant.storeswiki.com", "description": "Restaurant ordering in the StoresWiki commerce ecosystem."},
    "app-store.storeswiki.com": {"name": "StoresWiki Store", "url": "https://app-store.storeswiki.com", "description": "A store app of the StoresWiki commerce ecosystem."},
    # its own page's words (reels.storeswiki.com, 2026-11-14)
    "reels.storeswiki.com": {"name": "SnapReels", "url": "https://reels.storeswiki.com", "description": "A short-form vertical drama platform: bite-sized episodes of romance, thriller, revenge and fantasy series on a phone, unlocked with coins, picked up where you left off on any device."},
}

VENTURES = {"marketstudio.ai"}
SKIP = {"portfolio.cabscloud.com", "freelance.cabscloud.com", "membership.cabscloud.com", "app.agentforge.cabscloud.com",
        "enterprise.storeswiki.com", "app.dallham.com",
        "marketstudio.dev"}  # MagicAI's domain is parked (parklogic name servers, 2026-11-14): not live, not listed
# one-line summaries written from a product's own description, where its first sentence runs too long for a card
SUMMARY = {
    "luminaseo.cabscloud.com": "A WordPress plugin that keeps the technical half of SEO — metadata and structured data — correct continuously.",
    "rankai.thetechabc.com": "AI writing and SEO content optimization: keyword-rich articles, blogs and website content in seconds.",
    "workdo.cabscloud.com": "All-in-one business management: projects, accounting, HRM, CRM, POS and products on one platform.",
}
# home pages that show demo data, an empty catalogue or an error rather than the product: drawn, not photographed
NO_SHOT = {"storeswiki-grocery", "storeswiki-mart", "storeswiki-restaurant", "storeswiki-services", "storeswiki-store", "snapreels"}

CATEGORY = [  # host pattern → category, for what IN_HOUSE does not decide
    (r"66audit|seo\.codeengineers|rankai|luminaseo|monstertools", "Marketing & SEO"),
    (r"whatsapp|whatsaas|whatscrm|zender|pitchbar|stackposts", "Messaging, CRM & social"),
    (r"intellicall|agentlabs|ai\.autogineer|krikkit|nexai|marketstudio\.dev|dallham|davinci|mydzine|aitools|tools\.tennet|claw\.|webby|appforge|claude(ads|blog|seo)", "AI agents & automation"),
    (r"viser|opencut|reels\.", "Content & video"),
    (r"betterlearn", "Learning"),
    (r"erpgo|workdo|mgt\.|investstocks|dle\.", "Productivity & business"),
    (r"mart\.|shop\.|services\.|app-grocery|app-restaurant|app-store|superstore", "Commerce"),
    (r"thetechabc\.com$|inqdaily|trueorgame|syncverge", "Media & publishing"),
]


def brand(host):
    h = host.lower()
    for pat, b in [(r"autogineer\.com$", "AutoGineer"), (r"cabscloud\.com$", "CabsCloud"), (r"storeswiki\.com$", "StoresWiki"),
                   (r"codeengineers\.net$", "Code Engineers"), (r"marketstudio\.", "Market Studio"), (r"thetechabc\.com$", "Media"),
                   (r"tennet\.io$", "StoresWiki"), (r"dallham|davincistudio", "Market Studio"), (r"contengine\.pro$", "CabsCloud"),
                   (r"66audit\.pro$", "Code Engineers"), (r"stackposts\.pro$", "CabsCloud"), (r"inqdaily|trueorgame|syncverge", "Media")]:
        if re.search(pat, h):
            return b
    return "StoresWiki"


def category(host):
    for pat, c in CATEGORY:
        if re.search(pat, host):
            return c
    return "Productivity & business"


def slug(name):
    s = re.sub(r"[^a-z0-9]+", "-", name.lower().replace("&", " and ")).strip("-")
    return re.sub(r"-+", "-", s)[:60]


def clean_name(n):
    n = re.split(r"\s+[—–|-]\s+", n.replace("​", ""))[0].strip()
    return {"LeadPlatform": "LeadGen", "DALLHAM": "DALLHAM AI", "66audit": "66Audit", "A to Z SEO Tools": "AtoZ SEO Tools",
            "YouTube Research & Script Pro": "YouTube Pro", "Whats SaaS": "WhatSaaS", "AI Tool Finder": "AI Tools Finder",
            "IntelliCallAI": "IntelliCall AI", "TrueOrGame": "True or Game", "INQ Daily": "INQ Daily"}.get(n, n)


def waffle():
    req = urllib.request.Request(WAFFLE, headers={"User-Agent": "Mozilla/5.0 (Macintosh) majidkhanmohmand.com build"})
    s = urllib.request.urlopen(req, timeout=30).read().decode()
    a = s.index("var PRODUCTS = [")
    b = s.index("\n  ];\n", a)
    out = {}
    for m in re.finditer(r"\{\n(.*?)\n    \},", s[a:b], re.S):
        d = dict(re.findall(r'^\s+([nuicgt]): "(.*)",$', m.group(1), re.M))
        out[re.sub(r"^https?://(www\.)?", "", d["u"]).rstrip("/")] = d
    return out


def shoot(job):
    """(slug, url[, phone]) → the screenshot's path, or None. Headless Chrome, then a 1200 px WebP (a phone: 520 x 1125, from a 390 x 844 screen at 2x)."""
    s, url, phone = (job + (False,))[:3]
    png = f"/tmp/shot-{s}{'-phone' if phone else ''}.png"
    try:
        subprocess.run(["node", os.path.join(SITE, "scripts", "shot.mjs"), url, png, "390x844m" if phone else "1440x900"],
                       capture_output=True, timeout=60)
        if not os.path.exists(png) or os.path.getsize(png) < 20000:
            return None
        im = Image.open(png).convert("RGB")
        im = im.resize((520, 1125) if phone else (1200, 750), Image.LANCZOS)
        dest = os.path.join(PHONES if phone else SHOTS, s + ".webp")
        im.save(dest, "WEBP", quality=78, method=6)
        return dest
    except (subprocess.TimeoutExpired, OSError):
        return None
    finally:
        if os.path.exists(png):
            os.remove(png)


def main():
    shots = "--no-shots" not in sys.argv
    phones = "--phones" in sys.argv
    only = set(sys.argv[sys.argv.index("--only") + 1].split(",")) if "--only" in sys.argv else None
    os.makedirs(PHONES, exist_ok=True)
    cat = {x["host"]: x for x in json.load(open(CATALOGUE))}
    wf = waffle()
    rows = {}
    for host, x in list(cat.items()) + [(h, {"host": h, **e}) for h, e in EXTRA.items() if h not in cat]:
        if host in SKIP:
            continue
        x = {**x, **{k: v for k, v in EXTRA.get(host, {}).items() if not x.get(k)}}   # EXTRA fills what the catalogue lacks
        ih = IN_HOUSE.get(host)
        name = ih[0] if ih else clean_name(x.get("name") or host)
        w = wf.get(host)
        kind = "built" if ih else ("media" if x.get("kind") == "media" or category(host) == "Media & publishing" else "operated")
        if host in VENTURES:
            kind = "venture"     # a studio's own site: shown with the brands, not as a product
        rows[host] = {
            "slug": slug(name), "name": name, "host": host, "url": x.get("url") or f"https://{host}",
            "brand": brand(host), "kind": kind, "category": ih[1] if ih else category(host),
            "summary": (w or {}).get("t") or "",
            "description": ih[2] if ih else (x.get("description") or ""),
            "steps": [s for s in (x.get("workflowStepsSrc") or []) if s][:6],
            "benefits": [s for s in (x.get("benefitsSrc") or []) if s][:10],
            "stack": ih[3] if ih else [],
            "launcher": {"group": w["g"], "emoji": w["i"], "color": w["c"]} if w else None,
        }
    # the launcher's own descriptions where the catalogue had none
    for host, w in wf.items():
        if host in rows and not rows[host]["description"]:
            rows[host]["description"] = w["t"]
    # a product with no one-line summary gets its description's first sentence (titles and cards need one)
    for r in rows.values():
        if not r["summary"].strip() and r["description"]:
            first = re.split(r"(?<=[.:;])\s", r["description"], maxsplit=1)[0].rstrip(":;")
            r["summary"] = first if len(first) <= 160 else first[:157].rsplit(" ", 1)[0] + "…"
    for host, t in SUMMARY.items():
        if host in rows:
            rows[host]["summary"] = t
    # a summary sits under the name, so it does not open with the name again ("X — …", "X is a …")
    for r in rows.values():
        t, n = r["summary"], re.escape(r["name"])
        m = re.match(r"^%s\s*(?:—|–|-|:)\s*(.+)$" % n, t) or re.match(r"^%s (?:is|are) (.+)$" % n, t)
        if m:
            t = m.group(1)
            r["summary"] = t[:1].upper() + t[1:]
    items = sorted(rows.values(), key=lambda r: ({"built": 0, "operated": 1, "media": 2, "venture": 3}[r["kind"]], r["name"].lower()))
    seen = set()
    for r in items:  # unique slugs
        while r["slug"] in seen:
            r["slug"] += "-2"
        seen.add(r["slug"])
    if shots:
        jobs = [(r["slug"], r["url"]) for r in items if (not only or r["slug"] in only) and r["slug"] not in NO_SHOT]
        with cf.ThreadPoolExecutor(4) as ex:
            for (s, _), dest in zip(jobs, ex.map(shoot, jobs)):
                print(("ok   " if dest else "none ") + s)
    if phones:
        jobs = [(r["slug"], r["url"], True) for r in items if (not only or r["slug"] in only) and r["slug"] not in NO_SHOT]
        with cf.ThreadPoolExecutor(4) as ex:
            for (s, _, _), dest in zip(jobs, ex.map(shoot, jobs)):
                print(("ok   " if dest else "none ") + s + " (phone)")
    for r in items:
        p = os.path.join(SHOTS, r["slug"] + ".webp")
        r["shot"] = f"/shots/{r['slug']}.webp" if os.path.exists(p) and r["slug"] not in NO_SHOT else None
        if r["shot"]:   # a JPEG twin for link previews: not every network's crawler takes WebP
            jpg = os.path.join(SHOTS, "og", r["slug"] + ".jpg")
            if not os.path.exists(jpg) or os.path.getmtime(jpg) < os.path.getmtime(p):
                os.makedirs(os.path.dirname(jpg), exist_ok=True)
                Image.open(p).convert("RGB").save(jpg, "JPEG", quality=82, optimize=True, progressive=True)
        ph = os.path.join(PHONES, r["slug"] + ".webp")
        r["phone"] = f"/shots/phone/{r['slug']}.webp" if r["shot"] and os.path.exists(ph) else None
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as fh:
        json.dump(items, fh, indent=1, ensure_ascii=False)
        fh.write("\n")
    by = {}
    for r in items:
        by[r["kind"]] = by.get(r["kind"], 0) + 1
    print(f"{len(items)} items {by}; {sum(1 for r in items if r['shot'])} with a screenshot; {sum(1 for r in items if r['launcher'])} in the launcher")


if __name__ == "__main__":
    main()
