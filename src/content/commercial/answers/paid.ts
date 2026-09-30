import type { AnswerPage } from "../types";

export const paidAnswers: AnswerPage[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "how-much-does-google-ads-cost",
    question: "How much does Google Ads cost?",
    topic: "Paid media",
    primaryQuery: "how much does google ads cost",
    secondaryQueries: [
      "how much does google ads cost per month",
      "how much does google ads cost per click",
      "how much do marketing agencies charge for google ads",
    ],
    metaTitle: "How Much Does Google Ads Cost? Clicks, Budget and Fees",
    metaDescription:
      "Google Ads costs what you choose to spend. There's no minimum; click prices come from a live auction. Here's what sets them and how to find your ceiling.",
    updated: "2026-09-30",
    shortAnswer:
      "Google Ads costs whatever you decide to spend: there is no minimum, and you set an average daily budget that Google paces across the month. The price of each click is set in a live auction and depends on how contested your keywords are, how relevant Google judges your ad and page, and where and when people search. Management, landing pages and tracking cost extra.",
    keyPoints: [
      "There is no minimum spend. You set an average daily budget and Google keeps monthly spend within it.",
      "Each click's price comes from an auction, so it varies by keyword, location, device, time of day and ad quality.",
      "The full cost is media plus management plus the landing pages and tracking that make clicks worth buying.",
      "Your ceiling on cost per click should come from what a customer is worth to you, not from what competitors pay.",
    ],
    sections: [
      {
        heading: "What makes up the monthly cost of Google Ads?",
        body: [
          "Google's invoice covers only the media. Search campaigns are normally charged per click, and over a month you won't be billed more than your average daily budget times the average number of days in a month. Individual days can run above the daily figure to catch busier periods, then even out.",
          "Everything else sits outside that invoice. Someone has to build and tend the campaigns, the clicks need a page that turns visitors into enquiries, and you need tracking that tells you which searches produced customers. Leave those out and the media is the cheapest part of a failing account.",
        ],
        table: {
          caption: "Where the money goes in a Google Ads program",
          columns: ["Cost", "What it pays for", "Who sets it"],
          rows: [
            ["Media", "The clicks themselves, bought at auction", "You, through budget and bidding"],
            ["Management", "Building, reviewing and adjusting campaigns", "Your own time, a freelancer or an agency"],
            ["Landing pages and creative", "Pages and ads that match each search", "Designers, writers, developers"],
            ["Tracking and tools", "Conversion tracking, call tracking, CRM links", "Setup work plus any software fees"],
          ],
        },
      },
      {
        heading: "What decides the cost per click?",
        body: [
          "You never pay more than your maximum bid, and you usually pay less. The auction charges roughly what it takes to hold your position above the next advertiser, so a well-rated ad can outrank a higher bidder and pay less for the privilege.",
          "Click prices for the same business can differ by an order of magnitude between keywords. The quickest honest estimate comes from the bid ranges in Google's Keyword Planner, refined by a few weeks of real data.",
        ],
        list: [
          "How many advertisers compete for the keyword, and what a customer is worth to them",
          "Google's view of your ad's quality: expected click-through rate, relevance and landing page experience",
          "Location, device and time of day, which change who else is bidding",
          "Match types and negative keywords, which decide how many loosely related searches you pay for",
          "The bidding strategy you choose and the target you give it",
        ],
      },
      {
        heading: "How do you work out what you can afford per click?",
        body: [
          "Start from the customer and walk back through your funnel. Gross profit per customer, times the share you'll spend to win one, gives your allowable cost per customer. Multiply by the fraction of leads that become customers for a cost per lead, then by your landing page conversion rate for a cost per click.",
          "Consider a roofing company where the average job leaves $4,800 of gross profit. If the owner will spend a quarter of that to win a job, each customer can cost $1,200. If one in six leads becomes a job, a lead is worth up to $200; if one in twelve visitors enquires, the ceiling is about $16.70 per click. When the keywords that matter cost more than that, fix the conversion or close rate, or narrow the keyword list, before raising the budget.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does Google Ads cost per month?",
        a: "As much as the budget you set, since Google holds monthly spend to your average daily budget. The practical floor is a budget that buys enough clicks on your core terms to produce several leads a month. A budget that buys a handful of clicks tells you nothing about whether the channel works.",
      },
      {
        q: "How much does Google Ads cost per click?",
        a: "It varies by keyword, market and ad quality, from pennies on obscure terms to many times that on the most contested ones. Check Keyword Planner's bid ranges for your own terms and location, then compare them with the most a click is worth to you, worked out from your customer value and conversion rates.",
      },
      {
        q: "How much do marketing agencies charge for Google Ads?",
        a: "Agencies usually charge a share of ad spend, a flat monthly fee, or a fee that steps up with spend bands, sometimes with a setup fee. The number matters less than what it covers: landing pages, conversion tracking, CRM feedback and how often someone actually reviews the account.",
      },
      {
        q: "Do you pay for Google Ads if nobody clicks?",
        a: "For standard search campaigns, no. You're charged when someone clicks the ad, not when it appears. Some display and video campaigns can be bought on impressions or views instead, so check the bidding setup of any campaign that isn't plain search.",
      },
    ],
    related: {
      answers: ["how-much-should-i-spend-on-google-ads", "how-much-do-ppc-agencies-charge", "what-is-a-good-cost-per-lead", "is-google-ads-worth-it"],
      research: ["paid-search-economics-high-ticket-services"],
      services: ["paid-media"],
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "how-much-should-i-spend-on-google-ads",
    question: "How much should I spend on Google Ads?",
    topic: "Paid media",
    primaryQuery: "how much should i spend on google ads",
    secondaryQueries: [
      "how much should a business spend on google ads",
      "how much should i spend on google ads per day",
      "how much do i need to spend on google ads",
    ],
    metaTitle: "How Much Should I Spend on Google Ads? Set Your Budget",
    metaDescription:
      "Spend what your numbers support: enough to buy the searches that matter at a cost per customer you can afford. Work it back from customers and clicks.",
    updated: "2026-09-30",
    shortAnswer:
      "You should spend on Google Ads what your own numbers can carry: enough to buy the searches that matter at a cost per customer you can afford, and no more than your team can follow up. Calculate it from how many customers you want, your close rate, your landing page conversion rate and the local cost per click, then start with a test budget and scale while extra spend still pays back.",
    keyPoints: [
      "Build the budget backwards: customers wanted, then leads, then clicks, then cost per click.",
      "Check the result against what one customer is worth before committing a dollar.",
      "Daily budget is monthly budget divided by roughly 30.4; Google may overspend on busy days and balance it later.",
      "Scale only while the next block of spend still wins customers below your allowable cost.",
      "Sales capacity is a budget limit too. Leads nobody calls back are wasted spend.",
    ],
    sections: [
      {
        heading: "How do you calculate a starting Google Ads budget?",
        body: [
          "A budget built from a round number tends to be either too thin to learn from or too loose to control. Building it from your funnel ties spend to an outcome you can check.",
          "Suppose an accounting practice wants four new clients a month from search. It closes one in five leads, so it needs twenty leads. If one in fifteen visitors enquires, that means 300 clicks. At an estimated $9 per click, the media budget is $2,700 a month, about $89 a day, and each client costs around $675 in media. If a client's first-year gross profit comfortably exceeds that, the plan is sound; if not, the funnel needs work before the budget does.",
        ],
        list: [
          "Decide how many new customers you want from search each month.",
          "Divide by your close rate to get the leads you need.",
          "Divide leads by your landing page conversion rate to get clicks.",
          "Multiply clicks by the expected cost per click from Keyword Planner or past data.",
          "Divide the budget by customers and compare it with what a customer is worth.",
        ],
      },
      {
        heading: "How much should you spend per day?",
        body: [
          "Divide the monthly figure by about 30.4 to set the average daily budget. Google may spend more than that on a strong day and less on a quiet one, but keeps the month within the total.",
          "A daily budget that buys only one or two clicks spreads thin across the day and takes months to show a pattern. Automated bidding also needs a steady flow of conversions to learn, so a narrow keyword set with enough money behind it beats a broad one starved of budget.",
        ],
        table: {
          caption: "How the budget question changes as an account matures",
          columns: ["Stage", "What the spend is for", "What to watch"],
          rows: [
            ["Testing", "Learning click prices, conversion rate and lead quality", "Search terms, tracking accuracy, cost per qualified lead"],
            ["Proven", "Buying customers at a known cost", "Cost per customer against your allowable figure"],
            ["Scaling", "Adding keywords, locations or campaign types", "Whether each extra block of spend still pays back"],
          ],
        },
      },
      {
        heading: "When should you spend more, or less?",
        body: [
          "Raise spend when campaigns are winning customers below your allowable cost and Google reports impression share lost to budget, meaning you're missing searches you could afford. Raise it in steps and give each step a few weeks before judging it.",
          "Hold or cut when the extra spend buys pricier or weaker leads, when impression share is lost to rank rather than budget, or when the sales team can't reach new leads quickly. The first dollars in an account usually buy the best searches; each extra dollar reaches a little further from them.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much should a business spend on Google Ads?",
        a: "Enough to hit a customer target at a cost per customer the business can afford, which is different for every company. Rules of thumb that set ad spend as a fixed share of revenue are common, but they ignore your margins, close rate and competition. Build the number from your own funnel instead.",
      },
      {
        q: "How much should I spend on Google Ads per day?",
        a: "Take your monthly budget and divide it by about 30.4. Make sure that daily figure buys enough clicks on your core keywords to produce leads every week. If it doesn't, narrow the keywords or locations rather than spreading a small budget across everything.",
      },
      {
        q: "How much do I need to spend on Google Ads?",
        a: "Google sets no minimum, but a test needs enough spend to buy a meaningful number of clicks on the terms that matter over one to three months. Work out that figure from your expected cost per click and conversion rate. If it's more than you can risk, start with your highest-intent keywords only.",
      },
      {
        q: "Should I spend my whole marketing budget on Google Ads?",
        a: "Rarely. Search ads capture demand that already exists; they don't create it. Most businesses do better balancing paid search with channels that build demand and cost less over time, such as organic search, referrals and email.",
      },
    ],
    related: {
      answers: ["how-much-does-google-ads-cost", "is-google-ads-worth-it", "what-is-customer-acquisition-cost"],
      research: ["paid-search-economics-high-ticket-services"],
      useCases: ["scaling-paid-media"],
      playbooks: ["speed-to-lead"],
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "is-google-ads-worth-it",
    question: "Is Google Ads worth it?",
    topic: "Paid media",
    primaryQuery: "is google ads worth it",
    secondaryQueries: [
      "is google ads worth it for small business",
      "is google ads worth the money",
      "is google ads worth it in 2026",
    ],
    metaTitle: "Is Google Ads Worth It? When It Pays and When It Doesn't",
    metaDescription:
      "Google Ads is worth it when people search for what you sell and a customer is worth more than the clicks to win one. Here's how to test it properly.",
    updated: "2026-09-30",
    shortAnswer:
      "Google Ads is worth it when people already search for what you sell and a customer is worth more than it costs to win one through paid clicks. It usually isn't when search demand is thin, when click prices exceed what your conversion and close rates can support, or when leads wait hours for a reply. A small, properly tracked test shows which side you're on within a few months.",
    keyPoints: [
      "Google Ads captures existing demand. If few people search for what you offer, it has little to capture.",
      "It pays when the value of a customer comfortably exceeds the cost of the clicks needed to win one.",
      "Judge it on customers and revenue, not clicks or form fills.",
      "A fair test runs for at least a couple of months with conversion tracking confirmed before launch.",
    ],
    sections: [
      {
        heading: "When does Google Ads pay off?",
        body: [
          "Search ads work best for needs people act on by searching: an emergency repair, a legal problem, a product they've already chosen to buy. The searcher has told you what they want, which is rare in advertising.",
          "The economics come down to a few conditions. The more of the left-hand column you recognise, the better your odds.",
        ],
        table: {
          caption: "Signals that Google Ads is likely to be worth it, or not",
          columns: ["Factor", "More likely worth it", "Less likely worth it"],
          rows: [
            ["Search demand", "People search for your service by name", "Buyers don't know to look for it yet"],
            ["Customer value", "High value or repeat purchases", "Low one-off value with thin margin"],
            ["Follow-up", "Leads answered within minutes", "Leads wait hours or days"],
            ["Landing page", "A page built for each type of search", "Every click sent to the homepage"],
            ["Tracking", "Leads and sales tied back to campaigns", "Only clicks and form fills counted"],
          ],
        },
      },
      {
        heading: "How do you test whether it's worth it for you?",
        body: [
          "Run a contained test on your highest-intent keywords, with conversion tracking checked before the first click. Decide in advance what a customer can cost, and judge the test against that number.",
          "As an example, a home-cleaning service might value a recurring customer at $1,800 in gross profit over a year, and put $3,000 into a two-month test. If that wins six recurring customers, each costs $500 and the channel is clearly worth scaling. If it wins two, each costs $1,500, and the service should look hard at conversion rate, follow-up speed and keyword choice before spending more.",
        ],
        list: [
          "Confirm conversion tracking with a test lead before launch.",
          "Start with keywords that show clear intent to buy, plus a solid negative keyword list.",
          "Send traffic to a page that matches the search.",
          "Record which leads become customers, not just how many leads arrive.",
        ],
      },
      {
        heading: "Why do so many businesses decide it isn't worth it?",
        body: [
          "Most disappointing accounts fail on setup, not on the channel. Broad keywords buy searches from people who will never buy, clicks land on a generic homepage, and success is measured in form fills that include spam and job seekers.",
          "Others stop too early. A few weeks of data on a small budget is noise. Give a test a fixed budget and a fixed end date, then decide on the customer numbers.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Google Ads worth it for a small business?",
        a: "It can be, especially for local services people search for when they need them. Keep the scope tight: a few high-intent keywords, a defined service area and a page built to convert. A small budget spread across broad terms is where small businesses most often lose money.",
      },
      {
        q: "Is Google Ads worth the money?",
        a: "Only if you can show it produces customers at a cost below what they're worth. That requires tracking beyond the ad platform, into your CRM or sales records. Without that link, you're judging the channel on clicks, which can look fine while losing money.",
      },
      {
        q: "Is Google Ads worth it in 2026?",
        a: "The fundamentals haven't changed: people with commercial intent still search, and ads still appear for those searches, including in and around AI-generated summaries. More of the bidding is automated, which makes feeding the system accurate conversion data more important than ever.",
      },
      {
        q: "How long does it take to know if Google Ads is working?",
        a: "Expect one to three months, depending on budget and sales cycle. Early weeks show whether the searches and leads are relevant; customer and revenue numbers take longer, especially when deals close weeks after the first enquiry.",
      },
    ],
    related: {
      answers: ["how-much-should-i-spend-on-google-ads", "why-are-my-google-ads-not-converting", "is-facebook-ads-worth-it"],
      compare: ["seo-vs-ppc"],
      services: ["paid-media"],
      guides: ["landing-page-optimization"],
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "what-is-a-good-cost-per-lead",
    question: "What is a good cost per lead?",
    topic: "Paid media",
    primaryQuery: "what is a good cost per lead",
    secondaryQueries: [
      "what is a cost per lead",
      "what is cost per lead in digital marketing",
      "what is average cost per lead",
    ],
    metaTitle: "What Is a Good Cost per Lead? How to Find Your Number",
    metaDescription:
      "A good cost per lead is one below what a lead is worth to you: gross profit per customer, times your acquisition allowance, times your close rate.",
    updated: "2026-09-30",
    shortAnswer:
      "A good cost per lead is one below the most a lead is worth to you. Calculate that as gross profit per customer, times the share of it you'll spend to win a customer, times the fraction of leads that become customers. There's no universal good number: a cost per lead that's cheap for a law firm would sink a café. Judge leads by cost per customer, not cost per form.",
    keyPoints: [
      "Cost per lead is total spend divided by leads over the same period.",
      "Your ceiling depends on gross profit per customer, your acquisition allowance and your lead-to-customer rate.",
      "Industry averages mix businesses with different prices, margins and definitions of a lead.",
      "The cheapest leads often produce the most expensive customers.",
    ],
    sections: [
      {
        heading: "What is cost per lead?",
        body: [
          "Cost per lead is what you spent on a channel or campaign divided by the leads it produced in the same period. In digital marketing a lead is usually a form submission, a qualified phone call, a booking or a demo request.",
          "The definition matters as much as the arithmetic. Count spam, duplicates or job applicants and the figure looks healthier than the business feels. Agree what counts as a lead, and ideally what counts as a qualified one, before comparing campaigns.",
        ],
      },
      {
        heading: "How do you work out your own target cost per lead?",
        body: [
          "The right target comes from what a customer is worth and how many leads it takes to win one.",
          "Picture a kitchen remodeler clearing $9,000 of gross profit on an average project. If the owners will spend a fifth of that to win a project, each customer can cost up to $1,800. If one in eight leads signs, a lead is worth up to $225. Anything well under $225 leaves margin; anything persistently above it is buying projects the business can't afford.",
        ],
        list: [
          "Gross profit per customer: average sale value times gross margin.",
          "Acquisition allowance: the share of that profit you choose to spend winning a customer.",
          "Allowable cost per customer: gross profit times allowance.",
          "Lead-to-customer rate: how many leads it takes to produce one customer.",
          "Allowable cost per lead: allowable cost per customer times that rate.",
        ],
      },
      {
        heading: "Why can a cheap lead be the expensive one?",
        body: [
          "Campaigns that produce cheap leads usually reach people with weaker intent: researchers, bargain hunters, people outside your area. Their close rate falls faster than their price.",
          "Using the remodeler's $1,800 allowance, the pattern looks like this. The lowest cost per lead produces the highest cost per customer.",
        ],
        table: {
          caption: "Example: three campaigns judged by cost per lead and cost per customer",
          columns: ["Campaign", "Cost per lead", "Leads per customer", "Cost per customer"],
          rows: [
            ["Broad research terms", "$70", "30", "$2,100"],
            ["Social lead form", "$120", "15", "$1,800"],
            ["Service plus city searches", "$240", "5", "$1,200"],
          ],
        },
      },
    ],
    faqs: [
      {
        q: "What is a cost per lead?",
        a: "It's the amount spent to generate one lead, calculated as total spend divided by leads in the same period. Spend $2,000 and get 40 leads, and your cost per lead is $50. It says nothing on its own about whether those leads become customers.",
      },
      {
        q: "What is cost per lead in digital marketing?",
        a: "The same measure, applied to online channels such as paid search, paid social and display. Each platform reports its own figure based on the conversions it tracks, so compare them against leads recorded in your CRM rather than trusting each platform's count.",
      },
      {
        q: "What is the average cost per lead?",
        a: "Published averages exist, but they blend companies with very different prices, margins and lead definitions, so they make poor targets. A figure that's an average across an industry could be far too high or far too low for you. Your own allowable cost per lead is the only number worth managing to.",
      },
      {
        q: "What's the difference between cost per lead and cost per acquisition?",
        a: "Cost per lead measures the price of an enquiry; cost per acquisition usually measures the price of a customer or sale. Because only some leads become customers, cost per acquisition is always the higher figure and the one closer to profit.",
      },
    ],
    related: {
      answers: ["what-is-customer-acquisition-cost", "what-is-offline-conversion-import", "how-much-does-google-ads-cost"],
      research: ["paid-search-economics-high-ticket-services"],
      solutions: ["lead-generation", "lower-acquisition-cost"],
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "what-is-a-good-roas",
    question: "What is a good ROAS?",
    topic: "Paid media",
    primaryQuery: "what is a good roas",
    secondaryQueries: ["what is a good roas for meta ads"],
    metaTitle: "What Is a Good ROAS? Start From Break-Even, Not 4:1",
    metaDescription:
      "A good ROAS is one above your break-even, which is one divided by your gross margin. Here's how to set a target that accounts for repeat buyers and attribution.",
    updated: "2026-09-30",
    shortAnswer:
      "A good ROAS is one above your break-even ROAS, which is one divided by your gross margin. A business that keeps forty cents of every sales dollar breaks even at 2.5, meaning $2.50 of revenue per $1 of ad spend, so anything above that earns a profit on the order. The right target then shifts with repeat purchases, how much of the revenue the ads truly caused, and how generously the platform attributes sales.",
    keyPoints: [
      "ROAS is revenue attributed to ads divided by ad spend.",
      "Break-even ROAS equals one divided by gross margin, so thinner margins need higher ROAS.",
      "Repeat purchases can justify a first-order ROAS below break-even, if cash flow allows.",
      "Platform ROAS includes sales that would have happened anyway, so treat it as an upper estimate.",
    ],
    sections: [
      {
        heading: "How do you calculate break-even ROAS?",
        body: [
          "Divide one by your gross margin per order, after product cost, shipping, payment fees and typical returns. The result is the ROAS at which ad spend exactly consumes the margin on the sale.",
          "Because the formula divides by margin, the same ROAS can mean profit for one business and loss for another. A figure that looks strong for a software product can lose money for a grocery brand.",
        ],
        table: {
          caption: "Break-even ROAS at different gross margins",
          columns: ["Margin kept per sales dollar", "Break-even ROAS", "Revenue needed per $1 of spend"],
          rows: [
            ["70 cents", "1.43", "$1.43"],
            ["50 cents", "2.0", "$2.00"],
            ["40 cents", "2.5", "$2.50"],
            ["25 cents", "4.0", "$4.00"],
            ["15 cents", "6.67", "$6.67"],
          ],
        },
      },
      {
        heading: "Should your target be higher or lower than break-even?",
        body: [
          "Higher, if you need the ads to cover overheads and profit, or if you suspect the platform is claiming sales that would have come anyway through branded search and retargeting. Lower, if new customers reliably buy again and you can fund the gap until they do.",
          "A store selling a $120 skincare set, say, keeps $48 per order after costs, giving a break-even ROAS of 2.5. If its own order history shows customers place two more orders within a year at the same margin, a first order at 1.5 ROAS still returns a profit over the year. Whether to run at that level is a cash question: the ad spend leaves today and the repeat margin arrives over months.",
        ],
      },
      {
        heading: "What is a good ROAS for Meta ads?",
        body: [
          "The break-even arithmetic is identical; the reading is different. Meta credits sales to ads within a window after someone clicks or, depending on your attribution setting, simply views an ad, so its reported ROAS can include buyers who would have purchased anyway.",
          "Add up what Meta, Google and other platforms each claim and the total often exceeds your actual sales. A steadier check is blended ROAS: total revenue divided by total ad spend across every channel, tracked over time and tested with holdouts where volume allows.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a good ROAS for Meta ads?",
        a: "One above your break-even ROAS, read with Meta's attribution in mind. Because Meta can credit sales after a view as well as a click, compare its figure with your blended ROAS and any holdout tests before treating it as profit.",
      },
      {
        q: "Is a 4:1 ROAS good?",
        a: "It's a commonly quoted target, and it works out as break-even for a business keeping a quarter of each sales dollar. With higher margins it's healthy; with thinner margins it can lose money. Work out your own break-even before adopting anyone's rule of thumb.",
      },
      {
        q: "What's the difference between ROAS and ROI?",
        a: "ROAS compares revenue with ad spend only. ROI compares profit with total investment, including product costs, fees and management. A campaign can show strong ROAS and still produce a negative return once those costs come out.",
      },
      {
        q: "What is blended ROAS?",
        a: "Total revenue divided by total advertising spend across all channels for the same period. It ignores which platform claims credit, so it can't double count, and it shows whether overall spend is paying back as budgets change.",
      },
    ],
    related: {
      answers: ["what-is-incrementality-testing", "what-is-a-good-ltv-to-cac-ratio", "is-facebook-ads-worth-it", "how-to-measure-marketing-roi"],
      industries: ["ecommerce"],
      services: ["paid-media"],
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "why-are-my-google-ads-not-converting",
    question: "Why are my Google Ads not converting?",
    topic: "Paid media",
    primaryQuery: "why are my google ads not converting",
    secondaryQueries: ["why are my google ads not working", "why are my google ads not getting impressions"],
    metaTitle: "Why Are My Google Ads Not Converting? Four Places to Look",
    metaDescription:
      "Google Ads usually fail to convert because of wrong searches, a weak landing page, broken tracking or a mismatched offer. Here's how to find which one.",
    updated: "2026-09-30",
    shortAnswer:
      "Google Ads usually fail to convert for one of four reasons: they're buying the wrong searches, the landing page loses visitors, conversion tracking is broken, or the offer doesn't match what searchers want yet. Check them in that order. Start with the search terms report and a test conversion, because irrelevant searches and tracking faults are the quickest to confirm and the cheapest to fix.",
    keyPoints: [
      "First confirm tracking works: submit a test lead and see it recorded.",
      "Read the search terms report to see what people actually typed before clicking.",
      "Match each landing page to the search that led there, and make the next step obvious.",
      "If searches and page are right, the offer or the price may be the problem.",
    ],
    sections: [
      {
        heading: "How do you find where conversions are being lost?",
        body: [
          "Work from the symptoms. Each pattern in the account points to a different leak, and fixing the wrong one wastes weeks.",
        ],
        table: {
          caption: "Symptoms, likely causes and first checks",
          columns: ["What you see", "Likely cause", "Check first"],
          rows: [
            ["Leads arrive, but Google shows none", "Tracking broken or missing", "Test submission; conversion action status"],
            ["Clicks, no leads anywhere", "Wrong searches or weak page", "Search terms report; page on a phone"],
            ["Leads, but poor quality", "Broad intent or a lead-form magnet", "Search terms; what the form asks"],
            ["Conversions stopped suddenly", "Site change, form fault or tag removed", "Recent site edits; form test"],
            ["Few impressions at all", "Eligibility, budget or bids", "Ad status; impression share columns"],
          ],
        },
      },
      {
        heading: "What's wrong with the traffic?",
        body: [
          "Broad match and loose keyword themes can match your ads to searches only distantly related to what you sell. The search terms report shows the real queries; add irrelevant ones as negative keywords every week, and move strong ones into their own ad groups.",
          "Check the less visible settings too. Location targeting can include people merely interested in an area, not in it. Search partners, display expansion and automated campaign types can all send traffic you didn't intend. If the traffic is right and conversions still don't come, look at the page: speed on a phone, whether the headline matches the search, and how much the form demands.",
        ],
      },
      {
        heading: "Why are my Google Ads not getting impressions?",
        body: [
          "No impressions means the ads aren't entering or winning auctions. Work through the causes below before touching bids. New accounts and new ads may also sit in review briefly before they serve.",
        ],
        list: [
          "Ads or keywords disapproved or limited by policy",
          "A billing problem pausing the account",
          "Keywords flagged as low search volume",
          "Bids or quality too low to reach the minimum Ad Rank",
          "Location, schedule or audience targeting set too narrowly",
          "Negative keywords blocking your own keywords",
          "Budget exhausted early in the day",
        ],
      },
    ],
    faqs: [
      {
        q: "Why are my Google Ads not working?",
        a: "Define 'not working' first. No impressions is an eligibility or bidding issue; clicks without leads is a traffic or landing page issue; leads that never become customers is a targeting, offer or follow-up issue. Each has a different fix, so diagnose before changing anything.",
      },
      {
        q: "Why are my Google Ads not getting impressions?",
        a: "Usually because ads are disapproved, billing has lapsed, keywords have too little search volume, targeting is too narrow or bids are too low to compete. Check ad and keyword status first, then the impression share columns to see whether you're losing auctions to budget or rank.",
      },
      {
        q: "How long before Google Ads start converting?",
        a: "With tracking working and relevant keywords, leads can arrive within days. Automated bidding strategies take a few weeks to settle after launch or a major change, so avoid judging or restructuring during that period unless something is clearly broken.",
      },
      {
        q: "Why am I getting clicks but no calls?",
        a: "Check that the number on the landing page and ads is correct and trackable, that the page loads quickly on a phone, and that calls are answered during the hours ads run. Clicks from unrelated searches also inflate traffic without producing calls.",
      },
    ],
    related: {
      answers: ["why-is-my-website-not-converting", "how-does-google-ads-bidding-work", "what-is-a-good-conversion-rate"],
      guides: ["landing-page-optimization"],
      services: ["paid-media", "cro"],
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "how-does-google-ads-bidding-work",
    question: "How does Google Ads bidding work?",
    topic: "Paid media",
    primaryQuery: "how does google ads bidding work",
    secondaryQueries: [
      "how does google ads smart bidding work",
      "how does value based bidding work google ads",
      "how does google ads auction work",
    ],
    metaTitle: "How Does Google Ads Bidding Work? The Auction Explained",
    metaDescription:
      "Google runs an auction for every search, combining your bid with ad quality and context into Ad Rank. Here's how pricing, strategies and smart bidding work.",
    updated: "2026-09-30",
    shortAnswer:
      "Google Ads bidding works through an auction held every time someone searches. Each eligible advertiser's bid is combined with Google's assessment of ad quality and the search's context to produce an Ad Rank, which decides whether and where each ad appears. You usually pay less than your maximum bid. Smart bidding sets a bid for each auction automatically, aiming at the conversions or conversion value you tell it to pursue.",
    keyPoints: [
      "An auction runs for every search where ads are eligible to show.",
      "Ad Rank combines bid, ad quality, thresholds and search context. The highest bid doesn't automatically win.",
      "You pay what's needed to hold your position, never more than your maximum bid.",
      "Smart bidding is only as good as the conversions and values you feed it.",
    ],
    sections: [
      {
        heading: "How does the Google Ads auction work?",
        body: [
          "When someone searches, Google finds every ad whose keywords and targeting match, then scores each one. Only ads that clear a minimum Ad Rank can show, and their order depends on how they score against each other.",
          "The price is set by the competition beneath you. Your actual cost per click is roughly what you need to beat the next ad's rank and clear the threshold, capped at your maximum bid. That's why a highly relevant ad can hold a top position while paying less than a rival bidding more.",
        ],
        list: [
          "Your bid, set manually or by a bidding strategy",
          "Ad quality: expected click-through rate, ad relevance and landing page experience",
          "Ad Rank thresholds, the minimum score needed to appear",
          "Context: the search terms, location, device, time and other signals",
          "Expected effect of assets such as sitelinks and callouts",
        ],
      },
      {
        heading: "What bidding strategies can you choose?",
        body: [
          "Strategies differ in what they optimize and how much control you keep. Manual bidding gives you the controls; automated strategies take them in exchange for using signals you can't see.",
        ],
        table: {
          caption: "Google Ads bidding strategies at a glance",
          columns: ["Strategy", "Aims for", "Suits"],
          rows: [
            ["Manual CPC", "Your own bids per keyword", "Small or tightly controlled accounts"],
            ["Maximize clicks", "Most clicks within budget", "Driving traffic where conversions aren't tracked"],
            ["Target impression share", "Showing in a chosen position", "Brand terms and visibility goals"],
            ["Maximize conversions / Target CPA", "Most conversions, or conversions at a set cost", "Lead generation with reliable tracking"],
            ["Maximize conversion value / Target ROAS", "Most value, or value at a set return", "Sales or leads that differ in worth"],
          ],
        },
      },
      {
        heading: "How do smart bidding and value-based bidding work?",
        body: [
          "Smart bidding sets a separate bid for each auction using signals such as device, location, time, the exact query and audience membership, predicting how likely that search is to convert. It learns from your conversion history, so it chases whatever you count as a conversion, whether that's a customer or a spam form fill.",
          "Value-based bidding goes further by predicting how much a conversion is worth, not just whether it happens. You assign values to conversions, ideally imported from your CRM, and it bids more for searches likely to bring high-value outcomes. If a commercial contract is worth ten times a small repair job, the bidding needs to know that, or it will treat both leads as equal.",
        ],
      },
    ],
    faqs: [
      {
        q: "How does Google Ads smart bidding work?",
        a: "It uses machine learning to set a bid in each auction based on the predicted chance of a conversion, using signals like device, location, time and query. It needs a steady flow of accurate conversion data to learn, and typically takes a few weeks to settle after a change.",
      },
      {
        q: "How does value-based bidding work in Google Ads?",
        a: "You give each conversion a value, either fixed by type or passed in per conversion from your site or CRM. Strategies such as Maximize conversion value and Target ROAS then bid to maximize total value rather than conversion count, favoring searches likely to bring bigger outcomes.",
      },
      {
        q: "How does the Google Ads auction work?",
        a: "For each search, Google ranks eligible ads by Ad Rank, a score built from bid, ad quality, thresholds and context. Ads below the threshold don't show. Each advertiser pays roughly what's needed to beat the ad ranked below them, up to their maximum bid.",
      },
      {
        q: "Does the highest bidder always win in Google Ads?",
        a: "No. Ad quality and context are part of Ad Rank, so a lower bid with a more relevant ad and better landing page can outrank a higher bid. Improving relevance is often cheaper than raising bids.",
      },
    ],
    related: {
      answers: ["what-is-offline-conversion-import", "how-much-does-google-ads-cost", "what-is-a-good-roas"],
      research: ["paid-search-economics-high-ticket-services"],
      services: ["paid-media"],
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "is-facebook-ads-worth-it",
    question: "Are Facebook ads worth it?",
    topic: "Paid media",
    primaryQuery: "is facebook ads worth it",
    secondaryQueries: [
      "is facebook ads still worth it",
      "how much does facebook advertising cost",
      "meta ads vs google ads",
      "is boosting facebook ads worth it",
    ],
    metaTitle: "Are Facebook Ads Worth It? When Meta Ads Pay Back",
    metaDescription:
      "Facebook ads are worth it when you can show people something they want before they search for it, and keep creative fresh. Here's how to tell.",
    updated: "2026-09-30",
    shortAnswer:
      "Facebook ads, run through Meta across Facebook and Instagram, are worth it when you can show people something they'll want before they go looking for it: a product that sells visually, an offer with broad appeal, or a service for a clearly defined audience. They're a harder fit for urgent needs people search for, very narrow B2B buyers, and businesses that can't keep producing fresh creative.",
    keyPoints: [
      "Meta ads create demand by interrupting; Google search ads capture demand people express.",
      "Creative is the main lever. Ads tire quickly and need regular replacement.",
      "Cost is set by auction, mostly on impressions, and varies with audience, season and creative quality.",
      "Boosting a post is a simplified ad with fewer controls than Ads Manager.",
    ],
    sections: [
      {
        heading: "Meta ads vs Google ads: what's the difference?",
        body: [
          "The two platforms reach people in different states of mind. On Google, someone has typed what they want. On Facebook and Instagram, they're scrolling, and your ad has to earn attention before it can sell anything.",
          "That makes them complements more than rivals. Many businesses use Meta to introduce the offer and Google to catch the searches that follow.",
        ],
        table: {
          caption: "Meta ads and Google search ads compared",
          columns: ["", "Meta ads", "Google search ads"],
          rows: [
            ["Buyer's state", "Not looking; discovering", "Actively searching"],
            ["Main lever", "Creative and offer", "Keywords, bids and landing page"],
            ["Targeting", "People and behavior signals", "Search intent"],
            ["Usually billed", "Per thousand impressions", "Per click"],
            ["Strongest for", "Products, visual offers, broad audiences", "Urgent needs and high-intent services"],
          ],
        },
      },
      {
        heading: "How much does Facebook advertising cost?",
        body: [
          "You set the budget, and Meta's auction sets the price of reaching each audience. Costs rise with competition for the same people, in peak retail seasons, and when your ads draw little engagement, which the system reads as low relevance.",
          "Say an online store sells a $90 product and keeps $40 of it after costs. If its ads buy clicks at $1.20 and one in forty visitors buys, each sale costs $48 in media, a loss on the first order. Lifting conversion to one in thirty brings it to $36, a profit. The same arithmetic shows whether repeat purchases can cover the gap.",
        ],
      },
      {
        heading: "Is boosting a Facebook post worth it?",
        body: [
          "Boosting turns an existing post into an ad in a few clicks, with fewer choices over objective, placement and audience than Ads Manager. It's fine for giving a well-performing post more reach, such as an event announcement.",
          "For sales or leads, build campaigns in Ads Manager, where you can pick a conversion objective, test several creatives and measure results against your tracking. Boosts optimize for engagement by default, which rarely lines up with revenue.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are Facebook ads still worth it?",
        a: "For many consumer brands, yes, but they demand more than they used to. Privacy changes reduced how precisely Meta can track conversions, so server-side tracking through the Conversions API and a steady supply of new creative now matter more than detailed audience targeting.",
      },
      {
        q: "How much does Facebook advertising cost?",
        a: "There's no fixed price; you set a budget and the auction decides what each impression costs. The figure that matters is cost per customer, which depends on how well your creative converts attention into clicks and your page converts clicks into sales.",
      },
      {
        q: "Meta ads vs Google ads: which is better?",
        a: "Neither in general. Google search suits needs people search for; Meta suits products and offers people discover. Start where your buyers' intent is strongest, then test the other channel with a fixed budget and clear success measure.",
      },
      {
        q: "Is boosting Facebook ads worth it?",
        a: "For extra reach on a single post, it can be. For leads or sales, campaigns built in Ads Manager with a conversion objective almost always make better use of the money.",
      },
    ],
    related: {
      answers: ["is-google-ads-worth-it", "what-is-a-good-roas", "how-much-do-ppc-agencies-charge"],
      playbooks: ["creative-testing-system"],
      services: ["paid-media", "social-media"],
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "what-is-offline-conversion-import",
    question: "What is offline conversion import?",
    topic: "Paid media",
    primaryQuery: "what is offline conversion import",
    secondaryQueries: ["what is offline conversion tracking"],
    metaTitle: "What Is Offline Conversion Import? CRM Data Back to Ads",
    metaDescription:
      "Offline conversion import sends outcomes from your CRM, like qualified leads and closed deals, back to ad platforms so campaigns are judged on real customers.",
    updated: "2026-09-30",
    shortAnswer:
      "Offline conversion import is sending outcomes that happen outside your website, such as qualified leads, signed contracts and closed deals with their values, from your CRM back into an ad platform, matched to the ad click that started them. It lets you judge campaigns by real customers rather than form fills, and lets automated bidding learn to find people who buy.",
    keyPoints: [
      "It connects ad clicks to outcomes recorded later in your CRM or sales system.",
      "Matching uses a stored click identifier or hashed contact details.",
      "It matters most for lead generation with long or offline sales cycles.",
      "Imported outcomes must fall within the conversion window set for that action.",
    ],
    sections: [
      {
        heading: "How does offline conversion import work?",
        body: [
          "When someone clicks a Google ad, the landing page URL carries a click identifier, the GCLID. Capture it in a hidden form field, store it with the lead in your CRM, and when that lead reaches a stage you care about, upload the outcome with the identifier and timestamp.",
          "Google also accepts matches on hashed email addresses and phone numbers through enhanced conversions for leads, which helps when click identifiers go missing. Uploads can be a scheduled file, an API connection, or a built-in integration offered by some CRMs.",
        ],
        list: [
          "Capture the click identifier and source with every lead.",
          "Agree written definitions for qualified, opportunity and won.",
          "Upload each stage as its own conversion action, with deal value where known.",
          "Automate the upload so it doesn't depend on someone remembering.",
          "Once the data is reliable, make the deeper stage the bidding goal.",
        ],
      },
      {
        heading: "What is offline conversion tracking, and how is it different?",
        body: [
          "Offline conversion tracking is the broader practice of measuring outcomes that don't happen on your website: phone calls, store visits, signed deals. Import is the mechanism that sends those outcomes back into the ad platform.",
        ],
        table: {
          caption: "Common ways to feed offline outcomes back to ad platforms",
          columns: ["Method", "What it captures", "How it matches"],
          rows: [
            ["Click-ID upload", "CRM stages after a Google ad click", "Stored GCLID"],
            ["Enhanced conversions for leads", "CRM stages for form leads", "Hashed email or phone"],
            ["Call conversion tracking", "Calls from ads or site numbers", "Call details and duration"],
            ["Meta Conversions API", "Leads and sales sent server-side", "Hashed customer data and event IDs"],
          ],
        },
      },
      {
        heading: "Why does it matter for bidding?",
        body: [
          "Automated bidding optimizes toward whatever you count as a conversion. Count form fills and it learns to find people who fill in forms, including students, vendors and people outside your service area.",
          "Imagine two campaigns that each produce 40 leads a month at $100 per lead. The CRM shows one closes five deals worth $8,000 each; the other closes one. Without import, bidding sees two equal campaigns and may shift money toward the weaker one. With qualified and won outcomes imported, the difference becomes visible to both you and the algorithm.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is offline conversion tracking?",
        a: "It's measuring conversions that happen away from your website, such as calls, in-person sales or deals closed by a sales team, and connecting them to the marketing that started them. Offline conversion import is how those outcomes get back into Google Ads or Meta.",
      },
      {
        q: "What do I need to set up offline conversion import?",
        a: "A way to capture the click identifier or contact details with each lead, a CRM that records lead stages consistently, and a process or integration to upload outcomes regularly. Clear stage definitions matter as much as the technology.",
      },
      {
        q: "How soon does bidding use imported conversions?",
        a: "Imported conversions appear in reporting after processing, but bidding needs enough of them to learn. Many teams import qualified leads first, because they happen often enough, and add won deals and values as volume allows.",
      },
      {
        q: "Is offline conversion import compliant with privacy rules?",
        a: "Contact details are hashed before upload, but you still need a lawful basis and appropriate consent under the rules that apply to you. Check your privacy notice and consent setup before sending customer data to any ad platform.",
      },
    ],
    related: {
      answers: ["how-does-google-ads-bidding-work", "what-is-a-good-cost-per-lead"],
      research: ["paid-search-economics-high-ticket-services"],
      solutions: ["marketing-attribution"],
      services: ["marketing-analytics"],
      playbooks: ["speed-to-lead"],
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "how-much-do-ppc-agencies-charge",
    question: "How much do PPC agencies charge?",
    topic: "Paid media",
    primaryQuery: "how much do ppc agencies charge",
    secondaryQueries: ["ppc agency pricing", "how much do marketing agencies charge for facebook ads"],
    metaTitle: "How Much Do PPC Agencies Charge? Pricing Models Compared",
    metaDescription:
      "PPC agencies charge a share of ad spend, a flat retainer, spend-based tiers or a performance hybrid. Here's what drives the fee and how to compare quotes.",
    updated: "2026-09-30",
    shortAnswer:
      "PPC agencies charge in a handful of ways: a percentage of ad spend, a flat monthly retainer, a fee that steps up with spend bands, or a base fee plus a performance element, often with a one-off setup fee. The amount depends on how many platforms and campaigns they manage, whether landing pages and creative are included, and how deeply they connect results to your revenue.",
    keyPoints: [
      "The main models are share of spend, flat retainer, tiered by spend, and performance hybrids.",
      "Scope drives price more than the model: platforms, campaigns, creative, pages and reporting.",
      "At small budgets, management fees are a large part of total cost; at large ones, a smaller part.",
      "Compare quotes on what's included and on cost per customer, not the headline fee.",
    ],
    sections: [
      {
        heading: "What are the common PPC agency pricing models?",
        body: [
          "Each model creates a different incentive. None is automatically fairer; what matters is whether it fits your spend and aligns the agency with your results.",
        ],
        table: {
          caption: "PPC agency pricing models",
          columns: ["Model", "How it works", "Watch for"],
          rows: [
            ["Share of ad spend", "Fee rises and falls with your media budget", "An incentive to raise spend, not results"],
            ["Flat retainer", "Fixed monthly fee for a defined scope", "Scope creep, or effort dropping as spend grows"],
            ["Tiered by spend", "Fixed fee within spend bands", "Jumps at the band edges"],
            ["Performance hybrid", "Base fee plus a bonus tied to outcomes", "Who defines and measures the outcome"],
            ["Setup fee", "One-off charge for audit, tracking and build", "What you own if you leave"],
          ],
        },
      },
      {
        heading: "What drives the fee up or down?",
        body: [
          "Two quotes that look far apart are often pricing different jobs. Before comparing numbers, compare what each agency will actually do every week.",
        ],
        list: [
          "Number of platforms: Google, Microsoft, Meta, LinkedIn and others",
          "Account complexity: locations, product feeds, languages, campaign count",
          "Creative production for social ads and display",
          "Landing page design, build and testing",
          "Tracking work: conversion setup, call tracking, CRM feedback",
          "Reporting depth and how often a senior person reviews the account",
        ],
      },
      {
        heading: "How do you judge whether a fee is fair?",
        body: [
          "Set the fee against the whole cost of acquiring a customer, not against the media alone. A cheaper agency that leaves tracking broken can cost far more than its fee in wasted spend.",
          "For illustration, a business spending $15,000 a month across Google and Meta collects three quotes. One agency's share-of-spend quote comes to $2,250 for campaign management only. Another quotes a flat $3,500 that includes landing pages, creative and CRM conversion import. A freelancer offers Google-only management for $1,200. If the second option lowers cost per customer by even a small amount across 50 customers a month, it may be the cheapest of the three.",
        ],
      },
    ],
    faqs: [
      {
        q: "What should a PPC agency pricing proposal include?",
        a: "The pricing model and fee, the platforms and campaigns covered, what creative and landing page work is included, how tracking and CRM data will be handled, reporting frequency, contract length and notice period. It should also say who owns the ad accounts; you should.",
      },
      {
        q: "How much do marketing agencies charge for Facebook ads?",
        a: "The same models apply, but Meta work usually needs more creative production, because ads tire quickly and need regular replacement. Check whether new creative is included in the fee or billed separately, since that's often where quotes diverge.",
      },
      {
        q: "Are setup fees for PPC normal?",
        a: "Many agencies charge one to cover an audit, tracking setup and campaign build. It's reasonable if the work is real and documented. Make sure accounts, tracking and assets stay yours if the relationship ends.",
      },
      {
        q: "Is performance-based PPC pricing a good idea?",
        a: "It can align incentives, but only if the outcome is measured in your CRM rather than in the ad platform, and defined so it can't be gamed with cheap, low-quality leads. No one controls the auction, so treat any agency that will guarantee results as a warning sign.",
      },
    ],
    related: {
      answers: ["how-much-does-a-marketing-agency-cost", "how-much-does-google-ads-cost", "what-is-a-marketing-retainer"],
      compare: ["agency-vs-in-house", "agency-vs-freelancers"],
      guides: ["how-to-choose-a-marketing-agency"],
      services: ["paid-media"],
    },
  },
];
