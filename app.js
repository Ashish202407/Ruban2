(function () {
  /* ══════════════════════════════════════════════════════════════
     CONSTANTS — benchmarks, weights, exposures
     ══════════════════════════════════════════════════════════════ */
  var BENCHMARKS = {
    US: {
      "SaaS": { rev: [4.2, 7.8, 12.5], ebitda: [12, 18, 24], preseed: 6.0 },
      "AI-native software": { rev: [6.2, 10.8, 16.0], ebitda: [14, 21, 28], preseed: 7.0 },
      "E-commerce/D2C": { rev: [1.3, 2.3, 3.6], ebitda: [7, 10, 14], preseed: 4.0 },
      "Marketplace": { rev: [2.8, 4.6, 7.3], ebitda: [10, 15, 21], preseed: 5.0 },
      "Fintech": { rev: [3.6, 6.3, 9.8], ebitda: [11, 17, 24], preseed: 5.5 },
      "Healthtech": { rev: [3.0, 5.3, 8.0], ebitda: [9, 14, 20], preseed: 4.8 },
      "Edtech": { rev: [2.5, 4.8, 7.5], ebitda: [8, 12, 17], preseed: 4.2 },
      "Biotech/Deeptech": { rev: [3.8, 7.0, 11.0], ebitda: [10, 16, 22], preseed: 5.5 },
      "Climate/Cleantech": { rev: [3.0, 5.5, 8.8], ebitda: [9, 14, 19], preseed: 4.8 },
      "Consumer App": { rev: [1.8, 3.2, 5.2], ebitda: [6, 9, 13], preseed: 3.5 },
    },
    Europe: {
      "SaaS": { rev: [3.2, 6.1, 9.6], ebitda: [10, 15, 21], preseed: 4.8 },
      "AI-native software": { rev: [5.0, 8.5, 12.8], ebitda: [11, 18, 24], preseed: 5.8 },
      "E-commerce/D2C": { rev: [1.0, 1.8, 2.9], ebitda: [6, 9, 12], preseed: 3.2 },
      "Marketplace": { rev: [2.2, 3.8, 5.8], ebitda: [8, 13, 18], preseed: 4.1 },
      "Fintech": { rev: [2.9, 5.2, 7.9], ebitda: [9, 14, 20], preseed: 4.5 },
      "Healthtech": { rev: [2.4, 4.2, 6.7], ebitda: [8, 12, 17], preseed: 4.0 },
      "Edtech": { rev: [1.9, 3.7, 5.8], ebitda: [7, 10, 14], preseed: 3.4 },
      "Biotech/Deeptech": { rev: [3.0, 5.5, 8.8], ebitda: [8, 13, 19], preseed: 4.5 },
      "Climate/Cleantech": { rev: [2.4, 4.3, 7.0], ebitda: [7, 12, 16], preseed: 3.9 },
      "Consumer App": { rev: [1.4, 2.5, 4.0], ebitda: [5, 8, 11], preseed: 2.8 },
    },
    MENA: {
      "SaaS": { rev: [2.8, 5.2, 8.2], ebitda: [8, 12, 17], preseed: 4.0 },
      "AI-native software": { rev: [4.0, 7.2, 10.8], ebitda: [10, 15, 20], preseed: 4.8 },
      "E-commerce/D2C": { rev: [1.4, 2.5, 4.0], ebitda: [6, 9, 13], preseed: 3.2 },
      "Marketplace": { rev: [2.2, 3.8, 6.0], ebitda: [7, 11, 15], preseed: 3.8 },
      "Fintech": { rev: [2.8, 5.0, 7.8], ebitda: [8, 13, 18], preseed: 4.2 },
      "Healthtech": { rev: [2.0, 3.6, 5.5], ebitda: [7, 10, 14], preseed: 3.4 },
      "Edtech": { rev: [2.0, 3.8, 6.0], ebitda: [7, 10, 14], preseed: 3.5 },
      "Biotech/Deeptech": { rev: [2.5, 4.5, 7.2], ebitda: [7, 11, 16], preseed: 3.8 },
      "Climate/Cleantech": { rev: [2.2, 4.0, 6.3], ebitda: [7, 10, 14], preseed: 3.5 },
      "Consumer App": { rev: [1.5, 2.7, 4.3], ebitda: [5, 8, 11], preseed: 2.8 },
    },
    "India/South Asia": {
      "SaaS": { rev: [2.5, 4.6, 7.3], ebitda: [7, 11, 16], preseed: 3.5 },
      "AI-native software": { rev: [3.6, 6.5, 9.8], ebitda: [9, 14, 19], preseed: 4.2 },
      "E-commerce/D2C": { rev: [1.2, 2.2, 3.5], ebitda: [5, 8, 11], preseed: 2.8 },
      "Marketplace": { rev: [2.0, 3.5, 5.5], ebitda: [7, 10, 14], preseed: 3.4 },
      "Fintech": { rev: [2.5, 4.5, 7.0], ebitda: [8, 12, 17], preseed: 3.8 },
      "Healthtech": { rev: [1.8, 3.2, 5.0], ebitda: [6, 9, 13], preseed: 3.0 },
      "Edtech": { rev: [2.2, 4.0, 6.3], ebitda: [7, 10, 14], preseed: 3.5 },
      "Biotech/Deeptech": { rev: [2.2, 4.0, 6.5], ebitda: [7, 10, 15], preseed: 3.4 },
      "Climate/Cleantech": { rev: [1.8, 3.4, 5.4], ebitda: [6, 9, 13], preseed: 3.0 },
      "Consumer App": { rev: [1.5, 2.8, 4.5], ebitda: [5, 7, 10], preseed: 2.8 },
    },
    "Southeast Asia": {
      "SaaS": { rev: [2.6, 4.8, 7.6], ebitda: [8, 12, 16], preseed: 3.8 },
      "AI-native software": { rev: [3.8, 6.8, 10.2], ebitda: [9, 14, 19], preseed: 4.5 },
      "E-commerce/D2C": { rev: [1.5, 2.6, 4.2], ebitda: [6, 9, 12], preseed: 3.2 },
      "Marketplace": { rev: [2.4, 4.0, 6.2], ebitda: [7, 11, 15], preseed: 3.8 },
      "Fintech": { rev: [2.6, 4.6, 7.2], ebitda: [8, 12, 17], preseed: 4.0 },
      "Healthtech": { rev: [1.9, 3.4, 5.2], ebitda: [6, 10, 13], preseed: 3.2 },
      "Edtech": { rev: [1.8, 3.4, 5.4], ebitda: [6, 9, 13], preseed: 3.0 },
      "Biotech/Deeptech": { rev: [2.4, 4.3, 6.8], ebitda: [7, 11, 15], preseed: 3.6 },
      "Climate/Cleantech": { rev: [2.0, 3.6, 5.8], ebitda: [6, 10, 14], preseed: 3.2 },
      "Consumer App": { rev: [1.8, 3.2, 5.0], ebitda: [5, 8, 11], preseed: 3.0 },
    },
    LATAM: {
      "SaaS": { rev: [2.2, 4.2, 6.6], ebitda: [7, 10, 14], preseed: 3.2 },
      "AI-native software": { rev: [3.4, 6.0, 9.2], ebitda: [8, 13, 17], preseed: 4.0 },
      "E-commerce/D2C": { rev: [1.1, 2.0, 3.2], ebitda: [5, 7, 10], preseed: 2.5 },
      "Marketplace": { rev: [1.8, 3.2, 5.0], ebitda: [6, 9, 13], preseed: 3.0 },
      "Fintech": { rev: [2.4, 4.2, 6.5], ebitda: [7, 11, 15], preseed: 3.5 },
      "Healthtech": { rev: [1.7, 3.0, 4.6], ebitda: [6, 9, 12], preseed: 2.8 },
      "Edtech": { rev: [1.5, 2.8, 4.5], ebitda: [5, 8, 12], preseed: 2.6 },
      "Biotech/Deeptech": { rev: [2.0, 3.8, 6.0], ebitda: [6, 10, 14], preseed: 3.2 },
      "Climate/Cleantech": { rev: [1.8, 3.2, 5.2], ebitda: [6, 9, 13], preseed: 2.8 },
      "Consumer App": { rev: [1.2, 2.2, 3.5], ebitda: [4, 6, 9], preseed: 2.2 },
    },
  };

  var CURRENCY_MAP = {
    "US": "$", "Europe": "\u20AC", "MENA": "$",
    "India/South Asia": "\u20B9", "Southeast Asia": "$", "LATAM": "$"
  };

  var METHOD_WEIGHTS = {
    "pre-revenue": { Scorecard: 0.4, Berkus: 0.35, "Risk Factor": 0.25 },
    "pre-revenue-ctd": { Scorecard: 0.3, Berkus: 0.25, "Risk Factor": 0.2, "Cost-to-Duplicate": 0.25 },
    "early-revenue": { "Revenue Multiple": 0.45, "VC Method": 0.35, "DCF-lite": 0.2 },
    growth: { "Comps Blend": 0.45, DCF: 0.4, "VC Method": 0.15 },
  };

  var EXPOSURES = {
    Berkus: { growth: 0.15, multiple: 0.2, discount: 0.1 },
    Scorecard: { growth: 0.22, multiple: 0.28, discount: 0.08 },
    "Risk Factor": { growth: 0.08, multiple: 0.12, discount: 0.08 },
    "Cost-to-Duplicate": { growth: 0.05, multiple: 0.15, discount: 0.08 },
    "Revenue Multiple": { growth: 0.35, multiple: 0.5, discount: 0.15 },
    "VC Method": { growth: 0.45, multiple: 0.35, discount: 0.4 },
    "DCF-lite": { growth: 0.35, multiple: 0.1, discount: 0.5 },
    "Comps Blend": { growth: 0.25, multiple: 0.55, discount: 0.2 },
    DCF: { growth: 0.32, multiple: 0.1, discount: 0.55 },
    "Comparable Transactions": { growth: 0.1, multiple: 0.45, discount: 0.1 },
  };

  var PUBLIC_COMPS = {
    "SaaS": [
      { name: "Salesforce", ticker: "CRM", evRev: 7.8 },
      { name: "ServiceNow", ticker: "NOW", evRev: 16.2 },
      { name: "Datadog", ticker: "DDOG", evRev: 15.8 },
      { name: "HubSpot", ticker: "HUBS", evRev: 12.4 },
    ],
    "AI-native software": [
      { name: "Palantir", ticker: "PLTR", evRev: 22.5 },
      { name: "C3.ai", ticker: "AI", evRev: 9.8 },
      { name: "UiPath", ticker: "PATH", evRev: 8.2 },
      { name: "SoundHound AI", ticker: "SOUN", evRev: 28.0 },
    ],
    "Fintech": [
      { name: "Block (Square)", ticker: "XYZ", evRev: 2.8 },
      { name: "Adyen", ticker: "ADYEN", evRev: 14.5 },
      { name: "Affirm", ticker: "AFRM", evRev: 5.2 },
      { name: "Toast", ticker: "TOST", evRev: 4.8 },
    ],
    "Healthtech": [
      { name: "Veeva Systems", ticker: "VEEV", evRev: 12.8 },
      { name: "Doximity", ticker: "DOCS", evRev: 10.5 },
      { name: "Evolent Health", ticker: "EVH", evRev: 2.4 },
    ],
    "E-commerce/D2C": [
      { name: "Shopify", ticker: "SHOP", evRev: 14.2 },
      { name: "Chewy", ticker: "CHWY", evRev: 1.2 },
      { name: "Etsy", ticker: "ETSY", evRev: 4.6 },
    ],
    "Marketplace": [
      { name: "Airbnb", ticker: "ABNB", evRev: 8.8 },
      { name: "DoorDash", ticker: "DASH", evRev: 5.2 },
      { name: "Fiverr", ticker: "FVRR", evRev: 4.8 },
    ],
    "Edtech": [
      { name: "Coursera", ticker: "COUR", evRev: 3.2 },
      { name: "Duolingo", ticker: "DUOL", evRev: 14.5 },
      { name: "Chegg", ticker: "CHGG", evRev: 1.2 },
    ],
    "Biotech/Deeptech": [
      { name: "Twist Bioscience", ticker: "TWST", evRev: 8.5 },
      { name: "Ginkgo Bioworks", ticker: "DNA", evRev: 5.2 },
      { name: "Recursion Pharma", ticker: "RXRX", evRev: 18.0 },
    ],
    "Climate/Cleantech": [
      { name: "Enphase Energy", ticker: "ENPH", evRev: 5.8 },
      { name: "ChargePoint", ticker: "CHPT", evRev: 2.2 },
      { name: "Stem Inc", ticker: "STEM", evRev: 1.8 },
    ],
    "Consumer App": [
      { name: "Spotify", ticker: "SPOT", evRev: 4.5 },
      { name: "Pinterest", ticker: "PINS", evRev: 6.8 },
      { name: "Bumble", ticker: "BMBL", evRev: 3.2 },
    ],
  };


  /* ══════════════════════════════════════════════════════════════
     LOGO BASE64 (for PDF)
     ══════════════════════════════════════════════════════════════ */
  var LOGO_BASE64 = "/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAJYAlcDASIAAhEBAxEB/8QAHgABAAEDBQEAAAAAAAAAAAAAAAECCAkDBAUGBwr/xABbEAABAgQEBAMEBAgJCAYJBQEBAAIDBAURBgchMQgSQVEJYXETIoGRFDJCoRUjUnKSscHRFhczU2KCk5SiGSRDVFey4fBVY4OjwvElNEVHVnOEs9IYNXSFlcP/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAHREBAQEAAwEBAQEAAAAAAAAAAAERITFBAgNREv/aAAwDAQACEQMRAD8AyoJeya9SiAiIgJ1uidboCJr1KICIiANFN9bqEQVoo32KIJREQEREBERARQ5SgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICj4odUGiCUREBU/WVSIKSLKeYIdlSgJ8URBJFlCrUEjZBSgPZEQPimqa9EQEREBERAUHZSo3NkEAaX6FVXuo2UboJAsoIsp5lF0EIG2J1UkW6pv6IIREQURmc7XNG4C25ZLVOTj0yeY17YrHQorD9phFj+tbvotvMyYiERIZ5XjUEaKy2cws2Y6hgnLap4ImYcCVxzU5ujS0IwZamzDIZZBZ9kB4HMeXYXRdodEqcEcoLHjoXD9yLp+n7fX6/X+vvtz+Py+fiZ8uSsCdUQkjZPjdcnQ62REQETXoVN0EIilqCEUjqoQERNehQS1VKlqWvrdBO6lQBZSgIiICIiAiIgIoUoCIiAiIgIovZSgIiICIiAiIgIiICIiAiIgKLhSiAiIgIovZSgKFKICi9lKIKTrZQq1B2QDsqU16lEBERAREQOlk17oiAiKCgndEtfqoN++yCBzH7SEWG6k333RyCBpdQiki3VAUa9LIp3sghLjbupKFBBIG5ARLjqQEQVoiICImqAiaE2BRAQaXREDXoU36oiApAuoQaIJHVSNkBBTrYIFrIRfqpRAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBR8VKjqUEqDe2ilQdkFKIiAiIgJ0unWyICIiAoOykkDcpcdEBQbjqpOyi1+qADvdQTqhN0abIChSAeoT4oIUqEQOl0+CIdAT2QQ77uqKUQV79U63REBERAREQERLnoUBOtkRAREQFUNyoBsqkBERBClEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQFClEBERAREQEREBR5KUQQNEOylQdkFKIiAiIgIiIF7oiII16KU62RARQQCLHUKUFNiNwlkITlQLKFNtbeSDXugjToQVIF1CHUEd0Da5QADr8ENxsUQEQkDYBEFaa9Cg1F0QEJsiICIiAhREBERAREQFWqBuqrhBKIiAiIgIiICIiAiIgIiICIiAiKHOa0cziAB1KCUXQceZ95N5ZNccc5kUKkvaLmFFnGmL+g0l33K2zMLxVuHbCkR8phOWreK47QfflZcQYAP58Ugn4AoL0UWKLHni75nVMPgYAy/o9Ghm4EacjOmYlu4A5QD814jiPxBuKnEgc2LmPEkWu6SUBkK3oQEGch8aFCF4kRjAOrnWWxj4jw/LX+kVynwrb88ywfrK+fLEme+cuLYjouIszsSTrnb89QiAfIELqsfEWIZrWYrtQinu+Ze79ZQfRPGzEwDA1j41oUP86oQh/4ltzmplk02dmFhwf8A9nB//JfOpEm5uKSYk1EcT3eVT7d/86f0kH0YMzOy4im0LHuHnn+jU4J/8S3kvjTB81b6NiqkRSdgydhu/UV84ojxG/UiuBHmVrQqtU4H8hUZmH+bGcP1FB9I0CfkZoc0tOQIo7siB36luF85dJzHzAokVsekY2rko9hBaYU/Fbb4cy9Lw7xp8TmGHMMjm5WYzWWAZNRBGbb+sgz0osOOEPFP4j8PxGiuMoeIIAI5mzMt7N5Hk5h/YrgcE+L9gWb9lBx/llVacTYPjU6OyYaD1PK7lNvRBkNReB4D46eF7MN8GBSM0ZCTmI9g2BU2ulH37H2gA+9e5U+p02qy0OcpdQlpyXitDmRYEVsRjh3BaSCg3SIiAiIgIo+KFBKg7Ih2QUoiICIiAiIgIiICIiBr3UWuSpKjfVBAUu3t0VKnZBCkHyKhSUEIiIG/p0TW+2iIgmyKCbIgqGl0BUpa6AoFiVO+yICIiAiIgIDa/oiICIiCWqbBQDZTcIJRQpQEREBERAREQEREBFBNhcrw/PrjGyQ4fZWJBxVieDPVsMLoVFpzhGmyenOAbQge7yPK6D3FdCzNz1ykydp8SoZi47pdHENnOIESMHTDx/RhNu8/JYuc6vFGzmx6YlNy6gQcG0x1x7SDaLNOB7vIs3TsFZ3iDEtfxVVZiuYlrM7VJ+adzxpmbjOixHnzJKDJ1ml4ueD6fDjyWU2Ap2qzAJbDnKm8QINvygxt3H42VmGbXHFxGZvRYkKr46maVT3uJbI0o/R4YB6Ej3nfEromVWQWcWdc/wDQctsB1OrMDg2JNthFkrC/PjOswel7+SvXyu8IevTcCXns28w5eTc6zosjSYftC0fk+1dYX9Agx1Ts9Nz0d0zPzkaZjPN3RI0QucfUnVc3hjLzH2NYog4QwZWqy5xsPoMjEjC/q0EBZpsv/D04XMAMhvbgCFXJmGQfbVd5mCSOvKfd+5evVjFmUOT9FY6u1/C+EqbLs5YbY8xBlGAAfVaCRf0GqDD1gjw3uKnGUKHMzODJegQIgBDqpOMY63mxpc4fFe0YT8H7MKbiNfjHNSj06ER7zZGVfHeP0i0K6LHHib8K+EGxYVNxLUcSzEPQQ6XIvLXHyfE5W28wVb/irxiLxHtwZlLZg+o+oTtyfMtYNPmg7rh/whMp5NrTiLMbEVReN/Yw4cFp+FivQqH4XvCzSuUz9Eq9Vc3rMVB7b+obZWXYl8V7iPqz3/gKRw5RobtgyUMVzfi4rzureIZxZVVxc7M+NLA/ZlpaEwD7kGUym8BHCnTGhsLKenxbfz8R8Q/eVzUPg04YITQxuTOGyB3lgVh2m+Nbijnb+2zkrwv+RFDf1Bca7iz4k3m/8dGKfhPvCDMZP8DXCxUQ4RcoaPD5v5lpZ+orqNZ8NPhOqzXeywTNyLj9qWn4rbfAmyxWSvGNxOShBg5zYjP58zzfrXPU7j54sKa5roebdQi26RoUN4+9qC/eteEpkNOh/wCBsU4mpxP1R7ZkRrfm1eXYs8HmdZDMTBWcUOI+5tCqVP5W2/OYSfuXh9B8ULimo7mierFGqkMbiZp7Q4/FpC9Xw34wONoDWMxVldSpyw990rMvhE/AggIPOsVeFhxMUJj4lFbQa8xtyBLTvs3u9A8D9a8Ax3w4555aRYsPGuVmIae2F9aMJR0WDbv7SHzNt8VkrwP4tmRFaayDjTDOIsORnWu9kFs1BHxYeb/CricAcVHDnm4YclhPNHD07MxhpJTUYQI7vL2UXlcfgCgwCkFri1ws4bg7hd7y8z0zayrnoU/gTHtXpboJBEJkw50E26Fhu0jyss2OY/CBw35te2nMR5b0gzcxcunpFggRie/My1/irUszfCHw5NtmJvKnMKZp8QguhSdUh+1hg9B7RvvAedig6FlN4tmPaM6BT82MFyddlgA2JOU93sJj15TdrvuV7mTHG3w+52shy1CxnL0urOsDTKq4S0a56NLjyv8AgbrEbnJwbcQeRwjTWL8CzU1S4JN6rTAZqV5fynOaLsH54avFGPiwYgex74cRp0IJaQUH0rNc17Q5jgWkXBB3UrBvkrx88QWTjpWQhYoiYgosvZn4PqhMUCGPstefebptqshvDz4keTGcEWBQMYR2YKxBFIYyHUIrRKR3HYMjGwBPZ1vK6C7tQdVTBjQZiE2NAisiQ3i7XscHAjuCFWgjY3vuoJ6KSLqLFBCIiAiIgIiICdbJr1KICIdkQQSdQFFyjUIt1QNShFksm/VAshSyWsghE/V1UoIS47qL2+OyauFrC1u6BzNHVFKIK3WG4KgG6g91UgIg9UQLblE0OxRAREQEU9T6JYoIREQERVco6IA2UqBoiCVF1KIIB7lSiICIuNxFiSg4SpExXsS1eVptPlWF8aZmYgYxgHclByS8szu4mMn8gKLGqmYGK5aDNtbeBS5dwizsw7oGQhqL/lGzR1Kso4qvFFg8szgnh15nkh0OYxFHh8oB7S7DqfzjbyCxy4mxXiLGVZmK/iiszdUqM27mizEzEL3vPqUF1nEF4k+cea8eco2Bo7sH4ciksZDln/53Eh/04o2J7NVo8xM1CrTro8zGmJybmX3c97jEiRHHudSSV77w+8DWeef0WXqMhQzQcNxHj2lXqTTDYWdTDZ9aIe1hbzWT3IHgOyLyElYVTfS2Ygr0IB8Sq1NodyEdWMPusA+aDGfkJwA5+56FtRNDdhWgXF6nWGGF7Qf9VB+u/wBbBvmshWTPhnZA5aQ5WfxVJRcY1eCA58WoaS/P3EIaWvte67lndx2cPORQiUyo4lFbrEJulLowbHe09A9wIYz4lY8c8fE0zwzOiRqbglzMFUZ3MAyUf7SZiN6c8UjTTsEGVPFWamR2RVCMPEuLcOYXkJOH7so2IxjwB0ZBZ7zj5BpVmOcPi5YUp0OZpuS+CpqqRwSyHUqr+IgfnNhD3yPzuVYxa1W6ziGfi1Su1WaqE5HPNEjTMUxHuPmSuPO6C4bMnj34m8ymul5zMCYpMq695ekj6M0+Vx733rwer12tV+bdP1yrTlQmHm7oszHdEcT6uK2CpO6CpCLm6gGylAUEX6qV3/DmQGdmLqXL1rDOV2I6lITbeeBMy8i90OI3u12xCDz4ixsg3XZ8cZbY9y0nJenY+wnUqDNTcL20CFPQTDdEZe3MAdxddaQEXLYVwriHG+IJPC2FKTHqdWqD/ZSspAF4kV1r2AXodQ4TuJOlgmdyVxUy29pFzrfK6DyZFqzcrMSM1FkpyC+DHgPdDiw3izmPBsWkdCCtMC6CFVCc6E8PhuLHA3DmmxHxCcvmnL5oPTsv+JfPXLGYhRcIZmVuWhwrAS8SZdFgkdixxIsrscpPFszCocyySzawjKYgkbBpmqeRAmW9zyn3XemisBRBnhye41OHPPOQZCouNpKQqEUBsWk1ktlo4J6AP92IPNpIW2zZ4H+HHOlkSoVHB8rTqhGBIqNI5YDyT9o8vuu76hYKob3MdzMcQ4agg2IXu2TPGzn/AJKzUtDomMY9TpUuQHUypOMaC5g6C55m/AoPV+ILwxM4cr4U3iPLeKMbUKES8wZdvLPwGdzC/wBJb+hc+Ss7qFNqdHnIkhVpCZkpqCbPgzEJ0OIw+bXWIWYPIDxNsms0PolAzBa/BmIIxEK8y7mkYrztyxvs37OA9V7FnFwx5FcSFDdFxFQ5GPMTEP8Azes04sbHZ2cIjdHehuEGJHIXjazxyHfCkqNX31iisc3mpdSe6LCDQdmEm7PgspXDlx05McQMnCkYdWhYcxNYCLR6jFDHPcf5l5s2IL9Br3Cx58Rfhu5wZPvmq9gWE/GeGYTTEMWVh/55LtGpESCNTbu2/wAFaS109TJwOBjSk3LPB6siQ3g/MEFB9J4IIBBBBUrENwr+JPjfLKblMKZwxZnEmFyRCE59ackm7XBP8o0dQdeyymZbZrZf5u4eg4oy9xPJ1iQigEugv9+GfyXtOrT5EIO2Xslr7KVQgHRERAREQECIgXuiIgKLJy+ahBLk3Qi6AW6oIKWU819io6FBH6kJ3sdu6lEEJcDcop+SCnmsikjZEFWxspRRugXCkoAiAiIgImnQIgm5TXuFCm47IIRE62QFUOqpUtQVIiICIiAiK0/jM47MK8OEm7COGGQa3jmbhc0OVDrwpFp2iRiOvZm/U2CD1HiH4ocr+G/DbqtjSrMi1ONDLpCkS7g6amiNNG/Zbfdx09Vh94mOMPNLiUq721yedTMOQIrnSVGlnkQmDoYh/wBI63U6b2XleYmY+Mc1cVTuM8c1qPU6pPPLnxYrrhgvoxo2a0dAFcFwmcBmYXEPNQcTYigTGHcFMf70/Gh8sWctu2Aw6kf0zp2ug8GywynzBzkxPBwll5hyaq0/FI5vZN/FwWk254j9mt8ysovDH4Y2BMtvouLM4Y0DFOIIbmxWSQb/AJjLOGwsf5Qg9Tp5K5LLnKjJXhYwFGg0CVp2HqVKQvaT9Sm4gbEjEDV8WI7UnfT5KxPij8Uqpz8zPYO4eG/RZFodBfiCYh/jYp2JgMP1R2c7XyCC87PjizyR4ZqMZLEFXl4tVhQh9EoNODXTDh9m7RpDb5m3kCsXvEZ4hec2eb5mh0ia/gphiIeVklIRCI0Vn/Wxdz6CwVslbrtZxLVZiuYgqczUKhNvMSPMzEQviRHHqSVshog1IsWJGiOixojnvebuc43JPclUB1lBN1G5s3UoKua6gm69syW4NuIHPWOyJhHBE1KUskc9VqYMrKtB6tLveif1AVfjlB4SmXlAEtUs3MVzWI5tpD4klJtMvK3/ACSfrOHyQYusK4MxZjqqMouDcOVGtTz/AKsCSl3RX+p5RoPMq7DKnwtOIHHspCqeL307BkpEN/Zzr/azXL39mzQfErLNl9lHltlXTBSMvsG0uiS4Fj9FgNa9/m525+JVeNs1ctstZCJUceY5otDgQml7jOzjIbiB+S0nmcfIAkoPnyzQwJPZYZh4gy+qMX2sxQZ+LJOicvL7TkdYOt0uNV1oaq4bjszHyhzbz5n8fZPTszNyFRloTZ6NElnQGRZpg5C9gdZxBaGm5A1ureRsgLPBwHzDJvhNy7cDf2dNdCPq2K8fsWB89PVZxfDkmzN8JODwXX9i6bhfKO/96C0rxiqX7LG2X1YG0enzUv8Aovaf/Esd+nQrJv4xdLjzMllzPwJd8T2cWdhOLGk2uGEbeixmiSnb/wDqcf8As3fuQe+8AskZ7i1y/hgfUnIsQ/1YTis605EEKVjRT9iG53yCwm+G9RJyZ4sMLzMSTjthykKZil5hmw/Fkb/FZqa9F9hQ6jG/m5WK75MKD5zMdzJnMc4jmnOv7arzj7nzjvK4bZbrEEX29fqkf+cnY7/nEcVswSN9UFS984XeD/GvFKzED8LVuSpTKEyH+NnGOMONEfezLt2NgvAgbrNV4Z+WwwNw0UutzEoYM5iqNEqjy4WcYZPLDPoWgEeRQYzc1+CPiQyhMeYr+X03UKdAuTUKV/nUEtH2iG+8Pi1eEva6G8w3tLXN0LSLEL6V3iFEBgxAxwcLFrtbj0XiebPBnw85xw40TE+AJKXn4tz+EKe0S0wHHrzN0PxBQYE1STY6FZGc5/CQrVNgRqtkvjaDPQ4bS91PrDvZPsPyYwHL+kB6rHVNS0STmo0nGLDEgRHQnljw5pc02NnDQjTcINO5XuOQXGHnTw+VBjsL4gfUKQ5wMak1Bzosu9vXl1uw+YXhqE8pQZueG3xAsns/HQMPVSOzCuKIxDG06eij2cw86WgxNA4k/ZNj6rbcTXh85U59w5rEmHwzC2LIjedk/KwwYEw7e0WGLXv+UNfVYUYcd8KI2LCiOZEYQ5rmkgtI6ghXscMHiYZgZViSwlmpDjYqw1CIhCYL/wDPZWH5OP8AKAdj80FveevDhmtw9V91HzAw9FhSr4hZK1OCC+Umh3Y/vbobFbTJTPvMfITFMLFGX1cfLRBZsxKxLul5ll9WvZ19d1nEkqjknxWZY3gxKXivDVWhAvhOsXwnEbOafehvHwKxo8X3hzYkyelpnMDKVs3X8KwyXzcmG881INJ3sNYkMdxqOumqC+nhS43cvOJOQZSIxh0HF8Fl49KjRQRGsLl8Bx+uOttwrk9Cvm3o1bq+G6tL1miVCZp9QkYoiwJiA8w4kKI06EEagrKhwV+IrTswY9PyuzrnIUhiKKGy8hWHWbAnn2sGRDsyIehOhOm6C/ggeigiyi4dZzSCDqCNkuSgKGqUQERNOhQL+qdLIl7oCj990U3F7BBB1NuyhN0KCEU2UICXB2KIgKNACCd1N/P/AIoCOuiCNvMlFKIKreaW7lSiAoNuqnYIgInSyICadSiICIqibdEFKJe6IClqWKkCyAh0Q6qUBFBNtSrD+Pfj0pWXFLnMo8o6q2axbNAwqjUIJDoVNhEWLQ6+sY9h9Ub62Qclx18e1NyelYmWOU9Sl5/GUywtnJuE4Ph0pnnbQxT0HTc9FiUrNYr2LK5MVirzs1VKtUYxiRY0VxiRY0Rx+ZK02srWJquIcJk1UqnUY1gADEjRorj8ySVlT4EOACQy/kJTNfOekwprE8yBGp9LjND2U9h1DnjYxT/h9UHRuCPw4oU7KSGbGfsg8CLyzFMw9EFvd3bEmB3OhDPn2V6me3EPlRwvYF/CeJJuWgxIcIw6XRZQtEeZcBoxjB9Vuou42AXl/GBx2YG4d6TM4UwtGg1vHUaEWQJOCQ6DIXGkSO4bW6MGpt0WHXH+YmMs0MTTeLsc12ZqlSnHl74kZ5IYCb8rRs1o7BB6jxJ8X2aXEpWYj8QVF1Ow/CfeTosrEIgQx0L/AMt3mfgvDCRZUogIiIBNlzuAcUvwRjaiYtZKQZr8FT0KZdAjQxEZEY1wLmlp0NxdcERdU7IPozwdj3B1ay7o+PJGpSEnQ5+QhTkOM6I2FChsc0G19ALaj4LyKoce3DlDzIoWV2H8WOxDVq5OiR9tTYfPKyrzsYkZxDSCdPc5lhWqWbGY1WwlTcCTuL6k7D9IhuhSlPbHc2CxrnFxu0b6k79NF1+hVmcw7W6fiCnxCyZpszDmoRBtZzHAj9SGvpOjw/pMvEgh5aIrC3madRcWuF89/ElQsX4UzwxphXGdTn56cp1XmIbIs5GdEc+CXF0J13HYsc0rPDkxmDTs1cq8L5hUt15euUyDM8t7lj+Wz2HzDw4fBYyPFvynjUDNahZqyMENksTSQlJlwG01B0ufVhb8kFhQF1UoAspQFms8MKbM1wnUVt/5Coz0L/vSf2rCmsyfhSzzZnhgEqDcy1cnGn4lpQXe1Sh0atsZCrFKlJ1kM3a2YgtiBp8rhcaMvsCA3GDqMP8A6KH+5WkeKHmnmTlVlrheq5c4pnaHGm6sYExFlXcrnt9mSGk9tFjSfxfcTEZw9pnLiTTa00gz40/DOHaRF9vS6FISkQC3PAl2MPzAW3xvGEvgyvRz/o6bMu+UJyxoeGjnvnHmVnpPUPHOYdYrVOh0iLG+jzcfnYHhws63dZIs0Y30fLXFMc/Yo847/uXIPnMnHl87MRA768V7vmSqFDzzOc7uSVKDsGX+DqpmFjihYGosJ0SdrtQgSMIAbF7w3mPkAbnyC+ijCmHafhDDFJwrSoYZJUiSgyMu0C1ocNga3T0CxCeFnlfGxlxBnG0xLtdIYRknzBe4X/HxLth2+HMVmOiRYcFhiRYjWMbu5xsB8UGIHj74m8y6VxRz8HL7FtYokrhaXh06G6WjPhw40UDmiOLdnWcbX8lRk/4qmdeCYzZTMWnyeMadoCXH6PNNHk8Ag/ELKRj/ACOyjzVk40vjjAtHqzZhpDo0SXb7TXqHjW/ndYvPEK4Q8lOHKk0bEGX9XqkrP1ybfDZSY7xGhCG0Xc8ONnNsbDrug9yz28TPK3GnDhW4eWU7UKdjOtQvwZ+DZ2CYceTZEBESMHtuxwDb2Ide5GgWK86qmwPVSgKHC5upRBSiIg9EyVz5zKyHxRCxNl9iCNJvDm/SJVzi6XmWA6tezYjz3CzDcJ/Gvl1xNUT8FTbpei4ugM5ZyjzDxaMOsSCTo9p7bjqOqwbNXIUSuVfDdUl61QqlMSE9KPESDMS8Qsexw6ghBlY40/DppWYMnPZlZHU+WkMSwmumJmjwwIcGo9T7P7LIvYGwJ6hYrKnTazhqrR6VVpKaptRkYpZFgxWmHFhRGnYjcEELKjwReIfSswpaTywzuqsCQxK0CFI1WLZkGfA2a87Nieuh9V6Hxm8DWFuIeiTGLsGQ5elY6lYJfLx2gCDUANfZRbdSNA/oSL6ILeOBTxB5qRn5HKDPOsCJIRgIFKrsw43gv2bCjHq07B3Q76arJtAmIE1CZMS0VkWFEaHMew3a4HYg9QvnHxbhHE2AsRzeFsXUmYplVp8Uw40CM0tc0g7juOxCvv4AuO04UmZfJzOauPdR5gthUaqzDub6I86CFFcfsHoehQZTSU06FaMvMQZmCyZl4rIsKK0PY9jgWuaRcEEbhap2QTfy1UHZTp0KXuLICg7KVDuyCLeanbqoAt6dlNrdUEW1Un1QhR8UC6hSo18kC46oDfpohF7eSEu7fMoHWyXF7dQnu3uPimvUoIbext1RToNyiCq99ipUXU3QALKLdypN7aFLgboCIiAiIgIiIJbbujt0G6ki6ClVqkiycxQVIoOqty40+LSicMuAT9BfBnMZVproVIkCfqae9MROzG6epIHdB5tx9ccMjktR5nKvLqYZNY0qkuWTEyx/u0qE4W5j3ikXsOm5WIuHDrOJ6y2BCbMVGqVOPYAXfFjxnn5kkla2JMR4gxriKcxFXp2YqNWq0w6NHivJc+JEcf8AkALKV4ffApK4AkZHOrNeQbFxLNQhFpVOiC7KfCcLiI8HeIRb80eaDluA7gNlcoJSBmpmtJwZrGE1CD5KSc0OZS2HqehikW16Lfcc/HrTMjZaayyy0iQajjaYglszMXvCpTXDQm31onZvTc9luOPTjflchqWcucuZ2BM44qUImLFaQ9tLgnZzh/OO+yOlr9lh8rFXqdfqk1WqzPRpyenYro8xHjOLnxHuNySSgmtVqrYjq01XK5Pxp2fnYro0ePGdzPiPOpJK2SIgITY2QmypJB2QTzBSdF7Rwu8LmOeJrHEOhUKXiSlDlHB9Vq72H2UtD/JB+1EPRvxV0nG7wJZK5BZIS+OMG1ifl6xKTUGWe2cmOcT/ADXDrN6OFr6IMee6KkGyqQUndFVZLBBlj8I/NWYr2VdeyqqUz7SLhieM3Ihx1bKx9S30EQPP9deueInlB/Gvw3VqNKMJqWGD+GZWwuSIYPO34tJ+Sxt+Hfmq/LHiToUvMThg07El6TMtJ91xf/J3/rW+azbVmlylcpM5Rp+EIktPS8SWitIuCx7S0/cUHzXIu25tYKiZdZnYowPEY9v4FqsxKMDt+Rrzy/4bLqSAsuHhEz/t8j8SyJdcy1ecbduaE0rEermuFbjfxRws4XrWHKBgyn1oVibZNmJNR3sEMhgbYBu6C9zxc5D6RkDQ5z/Vq/D6flQ3BYheXzV0PEjx65kcSmC24ExPhih02mtm4c40ygeYgey9hzOO2vZWw8vmgvi8JGDz5+1mN0ZQ3/e8LKNnhFMHJzG0UbtoE8f+5csFvD1xE434b8VTeLsDS1Pjzk5LGViNnIRezkvfQAjVXDVzxVM5MTYSrGE69gnDMeDWJGNJPjQhFhvYIjC0uA5iLi6CyIbhVJZa8jLwpudl5WPNMlocaKxj4z78sJpNi421sBqgy+eFPlbFwjkRNY8noZbMYvnnxoNxY/RoRLGH4kOPyU+KjnFV8BZKSeCcPxI8CcxXNhkeZglzXQpeEQ91nDYkho9Lr3Ph7zEyAl8vcO5fZXZlUCpytCp0CSgw2TjGxnBjAC5zHWdcnU6blenYkwlhTGtNdS8U0CnViSitIMKbgNisIPqEGDXKvju4lMqJiWFMx9Hq8jAsPoNWH0mE9o6XNnD4FcDxL8TONeJ/FsjirGErLyAp8m2Ul5KVc4wYfV7xza3cdfksnGaPha8OuNxMzeFIFQwhPxiXtdIxeeA1x/6p2lvIEKxfib8PbHXDfhSNj2bx1QaxQ4UdsAXL4E05zjZobDIIce/vILUWqVDVKAiXsr1fDy4S8p+JCUxTVMyJ6bjPpESHAl5CVmPZOAcCfau6kdB6ILKEV03GpwSYg4ZqwMQ4cM1V8Dz77S845t3ybztCjEC3o7r6q1lAREQajHvhvbEhvcx7DdrmmxB7hZNuA/xCZebbTMmM7Z8w5g8krSK5FddsQkgNhRydjsA/5rGNzEKuHEfCe2JCe5r2kEOabEHugzdcZ/BvhziVwr+GaC2WkMaU2GYkhPtaLTTACfYxCN2nSzuh8lhixZhTEeAsST2FMV0uPTqrTIzoMxLxW2c1wPTuD0I3WR3w+uPOYrM1T8jc46k0zD2CBQ6xGfbnIHuy8UnqRo13fQr27jk4LqRxEYZi4twfLQJPHdKgOdLRQA0VBgF/YxD3/Jcdj5ILevD245oVNNPyLzcqrxAiOECh1aYiXDHHRsvEJ2HRrvgVkza8OaC1wIOoIXzd1Om1jDNYmKPVpWPT6nTo5hRoMQFkSDFYdR5EELK54ePGjAzQo0DJvMeqNZiumQQ2mTMZ+tSgNGrbneI0DbcjUbFBfTc33UgW6qm43uFJJ2sgkdVJ1UX8lKCL2FiVOyEXKIKTuo162UkaqEBNeieY2RBHKOqlPXdQTpfsglRZpBF73N1NwNyEAsgpLL9UVR0RAUk2O97Kd1G6Cep1S1+qA6XTRoNyglERAKJ+9EBOlkRBI3U3slwqUEk3UItGen5SlyUxUZ+OyBLS0N0WLFebNYxouST6IOjZ651YRyEy5qeYWLppjYMpDLZaWDgIk3MEe5CYOpJ+QuVghzqzlxfnpmBUcwcZTbok1OxD7GAHkslYIPuQmdgB817Bx4cU0zxGZoRJCgzUZmDsNxHytNgu0ExEBtEmCP6VrDyHmtjwT8KdX4lsx4L6jAiy+DaHFbHrE2B/K21bLsP5TuvYXPZB754bfBYzFs5Az8zSpjvwVJRQ7D9PjN0moo3mIgP2G6co6nXoL3ZccfFtRuGzL11Kw/PSsbG9bYYNMkg4F0tDtZ0w8D6rW6AA7k6bG3oGeOcmX3Cpk9Fr0+2XlYMhLCSotLhENdMxw2zITG9ha5PQAlYLM0My8VZu43qePcZVCJN1GpxjEJc4kQmX92G3s1o0AQcHX8QVrFVanMRYhqMefqM/FdGmJiM8ufEeTqSStgiICIiARcWXuvCJwsYh4ocwjQpWa+gUClBkxWZ+13Q4ROjGDq91iB0G68KXs3DPxT5g8L2JJ6t4NlpGflKpCbCnpCcDvZxQ0ktIc3Vrhc6+aDMTW6zkjwRZJuiQoMrSaRS4JEvKsIExUJm2gHV73G1z0WGviP4msxeJPGEWv4vn3wqbAiO/BtKhPPsJSH0sOrrbuOpW04gOIzMjiOxYcUY+qTeSECyTp8vdstKM/JY0k3PcnUry7lQQBdVKALKUBERBu6TUpui1WTrEhFdCmZGOyYgvabFr2kEG/wAFdjmL4nXETjSnspOH5qRwtLNgthOfIs5o7yGgFxiO2J30A3VoaIORxDiGt4rrM1iHEdTmKhUp1/tJiZjv5nxHdyVxyIgKebyUIgIiIJBshcoRAREQaktMzMnFbHlJiLBiMN2vhvLXNPkQvbMs+NHiNyrjQXUDMaoTcrBsPodRf9JhOHaz9R8CvDyQOqIMn+S/i60adiw6TnhgiLTrgD8K0d3tYd+74LrOaPNpd6Lw3xGuLHDefuJaFhbLWsmfwnR5cTTpgMfDEeaiDW7XAEcgsNRuSrMkQEREEE26LveTWdWPcisZy2Ncv6s+Tm4RAjQjrCmYd9YcRvUH7l0U7KlBnb4fOIbKnjKyviyFTp8i+fiy30eu4em7RCxxGpaD9aGTqHdPIrGjx4cGk3w2Yph4pwpePgivTDmShcffko5u72Du4sCWnsFb3ltmbjTKXFkljTAlbj02qSL+aHEhn3Xjq17dnNPUFercSPGpmzxOUWk4dxrL0mQp9KiCYEGnwntEaPylvtH8zj0J0GmqDwBERAQGyWKqQasrNTElMwpyUjPgxoLxEhxGGzmOBuCD0Ky3+HZxouzapP8AFFmZVoYxXS4QNNmoz7OqUACxBvvEbp6j0WIu9lyOHMRVrCdcksSYcqUaQqVOjNmJaYgu5Xw3tNwQgyo+I1wYPx9SJjO/LCkiJiKmw/aVmRgtAdPSzRrFYBvEaNSOoB6gA4tsOYgrWD8RSOI6FORpGp0qYbMS8ZhLXw4jD8x2Wbfgr4o6XxLZYQYlTfCh4ro8NstWZQkExDawjNH5L/uNwrFvEd4P5vK7FMxnNgKludhKtReepQoLPdp0047kDZjydD0OnUIL9OEDiboXEhlrK1UzMCFialsbL1mRDhzsiAaRQN+R1tD3uF701x3t96wA8Nmetc4fc1KXj2kxYrpRrxAqcqw6TMq4jnaRtcbjzCzt4Bx1h3MjCVNxthKfZOUyrQGx4MRp1Fxq1w6EG4IQdm06G6qI81pAkk2NlXr1N0FXN5ITZQEJuUA6oEOqi4OxQPmiEX+VkQNhdEQEIGvUoDdFBvaxdv3CCRfqUTXoUQVFCo36oeqCdkad0+slwglOlkRBA3ulvNSiAiIgkGyFQiArCvE84poWB8IDInBs9/6exFD56tGhRNZOS/I01D4h0/NB7q8bN3MejZR5bYhzFrseHClKHJRJn33Ac8S1mMHcucWtA818/eZuYFdzTx3Wcf4kmHRZ+szT5h9zowE+6weQFgg0MAYGxFmZjOlYDwrKmZqlZmWy8ButgSdXHsALklZ3Mg8oMH8LWSUrhr6TAhQaXKunqxUHWaI0bl5okRxPQWsPIK1bwsuGEYZw7Hz9xhTi2qVlpl6JCiw7GDKfajC/V50HkPNcN4pfFPM02Azh3wVUAx81DbMYijwYnvCGdWS1xtf6zvKw7oLQuM3iXqXEhmvM1eBMRW4ao7nSlFlXH3WwgdYpH5TzrftYLwIm6iwCICIq0FCk6KpEFCKpypQEVXL5py+aClFJFjZQgIiICIiB1t1PQKv2UQ/6N/6JV9fheyfDvUa7iOSzSlaJGxS50M0gVcNMMwLHn9nz+7z3362tZZJG4O4dgNKFgT4Q5VB8+BgxQL+yf+gVSWRQbexifolfQj/BPh2/6DwL/ZyqkYV4eB/7EwN/ZyqD57eSLa3sYn6BQQ4w/wBBE/QK+hH+DHDqP/Y+Bf0JVSMN8O42pOBf0JVB89vJG/mIn6BU+zjfzEX9Ar6E/wCD/D1/0Vgb9CVT+D/Dz/0XgX9CWQfPYIUY/wCgi/oFT7GN/MRf0CvoQ/g5w79aXgU/1JZVNw7w968tJwMNPyJVB89RNiWkWI3BRXh+Ja3IiHmtS4GTsOjtnWSjvw3+CQ32Ai83ug8nu89t7KzxAREQEREBQRbqpRBSiqUEX6oIUtTl81IFkBERBSd0VShw6oPS+HnPbFnD3mZTMwMMTDiyA8Q5+UJ/Fzkq7R8Nw9NQehAKzmUqp5f8S+TP0qCyFUcO4vpjocWE8BxaHtsWkdHNP3gL55xur5fDV4sJjLTHEvktjCc5sMYmmPZyMaJEsJCdd9XfZjz7p7Eg90Ft3EZkZiDh7zUqmX1cYXQYbjHp0zY8sxKuJ5HA9xsfMK6vwweJYYRxRGyNxXPltLrsT29IixX+7AmxvCF9g8beY81d3x/cNEpn7lBMVmjSjTizCkN89TIrGXfHh2vEgHqQ4C48wFhYptQqWH6tAqElFiyk/TphsWG4Xa+FFY64PkQQg+j5kQWvqb6bLWYdCe68B4Ns/wBnEDkzTMST0aF+HZD/ADGrw2HVsdg+uR0DhZ3xK95a423KDca9TdEuBuiCdtihUIgJe5IUqEBCbC6Aak9SiAdbj70tdRYWIupQLnYWv5olrognYkXS/dNR+0Jpe10E7psgsNym6CU80SyB1KIiAiIgIi6XnNmfRMm8scQ5j199pajSb4zWAgOixTpDhtv1c4gIMbvir8RExiTFslkPh2eb+CaGWztY9k+/t5s/Uhut0YNbdz5K2LhIyRmM/M8aBgp8CI6mQ4v06qxGNuIcrD1dc9OY2b/WXmGMMVVbG+K6ri6sxXRZ6sTcSbjOJv7z3E2+Gyy++Ghw+NymybOO67LNGIMaFk08uZZ0CUaPxUO++ty4+o7IPZ+IXNnDfDHkVUsUwWy0t+DJMSNGlPqiJMFvLCY0De258gVgXxdiut45xPU8XYknHzVTq0w+ZmYzzq57jf5DYK8LxQeIiHmdmpLZYYcnWxaDg3mbHdDddsefd9cnuGCzR5lysmQVKpqoaqgCTZouT0QTYKb2WqJCfOokpj+yd+5R9Anv9SmP7J37kGne6gnstX6BP/6jMf2Tv3J9BnuslMD/ALJ37kGkDfQoQFXElpmE3miy8Vg7uYQFpIJuVUo5fNUoKnbqlEQEREBFrNk5x7Q9kpGc06gthkg/cqvoE9/qUx/ZO/cg0WRHwnB8N7mOGzmmxHxWt+EKgd5+Z/tXfvUfQZ4byUx/ZO/chkp0A/5nMf2Tv3IKvwjUP9fmf7Z371H4QqFrfT5n+1d+9af0ScsSZSOANSTCd+5aQKDcfT58m/06Z/tXfvT6dPf69Mf2rv3rQGouiDX+nT3+uzH9q796fTp7/XZj+1d+9aCINf6dPf67Mf2rv3p9Pn/9emP7V371oIgkkucXOJJOpJ3JUKpjHxYghQmOe931WtFyfgvS8DcNWeuZDgMH5ZVydhOt+OMsYcO35z7BE15kiu1w/wCF/wAVlbY2JMUKiUlrv9dqQBHqGNcV3WW8IbP+ND55nHOCID/yRGmX/f7IIqxVFfDU/CM4jZWGX07FuBZ0gX5TOTMIn5wSF0PEPhq8WGH2PiDBsjU2sF//AEfUGRCfQO5T9yC1pF3DGeUGaGXsy+WxlgStUp0M2c6PKPDP0rW+9dPvdAREQEREBERAREQQRbVaktNTEnMQpuViuhxoL2xIb2mxa4G4I+KoOqpIsbIM5nApxES3EBkpJxKpNwYmJKA1tPq0HmBe4gWZFI7PH3grHl4kPDxCyczlOL8OyT4eHcZNdOQw1tmQJsH8bD7C+jh6ldI4GM+o2Q2e9Jqc5NezoNeIpVXY51m+ziH3Inqx9j6XWWXi3yTpvEPkNW8MynI+pMlvwlRZgDm5ZiGOZgB7PF2n86/RBi78P3iEj5JZ0SlHqk2GYbxc5tOnw91mwYpP4mN2FnWafJx7LNIyM2I0FpDmuFw4G4svnBmZaepE/GkZyG+Xm5KM6FEYdHQ4jDYg+YIWcDgrzmh5z5C0Ksxo5dU6VDFMqQc659tDAAd/WFj8UFwjXX0K1ua4uAtnDc46my3TX62IQVprc3KHaym/qgKE+0U62QNbXA2T4J8E6IIKF1gT2Ug9DuoIvqCggg3uT8tEQjlJO9/OyIK7oiIIVXN5KL+QUk9EC/kp+KpvreyqQOt0QogJsSERAWNHxcM6n3w7kbSZ6zP/AN5q0NjtSbFsFjvLVzrenZZJ5+dl6bIzFRm4jYcCVhOjRXuNg1rRcn5BfP8AcTeakbOjO/FePXuJl5uefBkwfsy8M8kMfIX+KDV4WcoZ7PDPTC+ApaCXy0abE1UHke7ClIXvxCfUDlHm4LNBxN5o07h24fK7iuShMhvp8k2n0yCDygx3j2cID03+CtR8JHJmXpWGsQ511OAXTlWf+CqcXN+pLsIdEc0/0nco/qLzXxY89jibHNIyRos+XSGHG/hCqMY73XzkQWY0/mMv+n5ILBKjUZ2rVCZqlQimLMzcV8eM8m5c9xJJ+ZWgiAXQVAWW5p07Gp0/L1CWLfay0VkVgcLglpBFx1Gi2ykdfRBnp4aKjlnnbkrhnMGXwVQBHnZRsKchtkoR9nMQ/diN27i/xXqIy3y/G2CaH/cIX7lj38IHNCI6FjPKGenQWQzDrVPhPdqCfxcYNHwYVkrQdc/i5wB/8FUP+4Qv3J/Fxl//APBND/uEL/8AFdjRBbnxhcOOFczcgcT0TDuG6bI1eUlzUJGNLSrGP9rC97lu0Xs4XHxWC97HwnuhRGlr2OLXNO4I3C+lmLChxob4MVgcyI0tc07EHcLAtxq5VQcnuJHF2GJKWMCnTUyKnINtZvsY/v2b5BxcPgg8OBsoREBERAXaMsMETuZGYWH8C09rjGrU/BlfdFyGucOY/AXK6ur3vClyp/hhnbUcfz0mIkjhGSDob3Nu0TUYkMA8w1rj8kGUbC2S2WWGMOUzD0ngiimDTpSFKsL5OG5xDGgXJIuTpuuXGW+Xw2wTQ/7hC/cuxog64ct8vzvgmh/3CF+5QctcvSLHBFD/ALhD/cuyIgs78QzFWBsk+H+osoWEaFArmJyaVJPbJQg6GHD8ZEbpuG3se5CwxDQAeSvV8VXN5mOM+4OXtMnfa0/BUmyBGa112GcitESJ5Eta5jfIghWVoKhsiDZEBEXqvD3w3ZjcR+LmYawTTi2VhuBnqnGaRLykPqXHqezRqUHmdNptRrE/ApdJkY85OTLxDgwILC98RxOgAGpKvTyF8LXNfMaDLV3NCpNwXSIhD/YGGIs9EZ+ZflZcdyfRX/8ADpwS5M8PEnLzlJo7KxiRrQY1Zn2B8Xntr7MbQx6a+auDQeC5OcEXDtknDZEw3gmFUaiwC9Rq5E1MOPe5Aa3+q0L3WXlpaUhiDKwIcGG3QNY0NA+AWqiAiIgIiINjVaFRq7LPkqzSpSegRGlrocxBbEaQeliFaznR4anDzmlCmZ/D9MjYMrcUFzZql29gX/04DvdI/NLVdoiDB9xBeH7njkU2PV4MgMVYegtL3VGmQnF0No6xIX1m/C4VsZBBIIsQbEdl9LUWFDjQ3QY0Nr2PBa5rhcEdiFZHxWeGngHNWDP4xykbAwvish0Z0q1tpKdfvYtH8m4/lDTuEGIBFz2OcCYsy2xLOYRxrRJml1SRiGHFgx2EXt1adnNPQhcCgIiICIiAocLm6lEAOIILXWI1B7FZsvDsz3dnRkLK02qRS+t4Qc2lznM67okMNvCifFunq0rCY3dXceGlnRFyy4gpTC0/UGwKLjOGadMCI6zBMAF0F3rcFv8AWCCnxJ8mzldxAzeIKdJtg0jGMP8ACcAsbZojbRW/pa/1lzvhiZ3vwHm7MZZ1adEOkY0hBkDnd7sOfhgmGR252l7fM8qvQ8S/JOFmfw+zeLKdAvWsEP8AwnALRcxJY+7Hhny5bP8A6iw6YUxDOYUxLSsT02IYc1SpuFNwnA2IcxwcP1IPovZEeNBv5jdbuG8N3GvULo2VmNZPMLAFBxnIxg+BVpGFMt12Lmi4+dwu5Mfym5OhQbznaeuilri4baLSZY7A3Wo0WBPkPkgruoQCxvp8kBv00KCCbI4gddeim45iSbKNyR2QQASbk7ITyed9VLTfZ33Kl12+7cIJu3e4v3siG3MbglEFSfrREE3Qi3xUKrdBG2xU2so3+CXsgqARQBZB9yCUREFuHiA5qxsquGjEk1T5kQalXg2jShvqDG0iEekMP+YWD6QkJuqT8vTZKC+NMzcZkGFDaLue9zgAAO5JWQ7xfsxnzeJMGZXSsx+KkJaLVpuGDvEiEMh3/qh/zVvvh75Vx80uJrDgiyvtadhsurc6XD3QIX8mPUxHM+RQZbMscO0jh84dabT4sJktAwxQDNTewvEbCL4hJ7l11ghzLxvUcx8fV/G9ViF8zWZ6LNOJOzS48o+AsFl98TzNZ+XfDVO4cp00YFSxpNwqTDLT7wlwfaRyPIsZyH/5iwtjr6IJapS1kQFLd1CIPZ+ELNT+J3iEwli6PMOgyT5sSM8eaw9hG911/IEg/BZ85ePCmZeHMwIgfDisD2OBuHNIuD8l803M4EOa4tcDcEbg91ne4GM2v44OG7C1cmoofUqZA/BM/rc+1g+6CfVvKfig9/REQFjj8XvKaLPUDCucdMkQ402I+kVJ7BqIT/ehOd5BwcPiFkcXm3EZljLZw5K4sy/jBvtKlToolnOF+SO0c0N3wcAg+eoEHZFqT8hNUqfmaXPMLJmTivgRWkWs9pIP3haaAiIgLN74c+Tn8UvDXRZioSwh1jFbnVueNveAiaQWH0hBnxJWHvI/AMzmhm3hXAkqwuNWqUGFEsNoYdzPP6IK+hmj0yWotJk6RJQxDgSUCHAhtGwa1oAH3IN4iIgLqObWYFNysy3xDmBVXD2FEkIs1yk253taeVo8ybBduVhvi1ZsnC+UdGyxp83yTmKpwxZhrT730WDYn4FxA+CDFNivElTxjierYsrMYxZ+sTsaemHk3JiRHlx/WuKG6gKoC3VBKIu/ZIZM4sz5zDp2XuD4N5mceDHjuH4uWgg+9Ed5AIO18LvDBjLiZx3Bw7RmPk6LLPa+q1UsuyWhdQO7zsAs3mUWT2BMkMGSeCMA0dklIyzAIkQgGLMRLaxIjvtOK2eRGRuCOH/L+QwDgmREOFLMDpqafrGnI5HvxXnuTsNgLAL0VAREQEREBEWjEm5WEbRZmEw9nPAQayLThx4EX+SjMf8AmuBWogIiICIiDxXiZ4VsuuJXCEekYikIUpXIUN34NrEKGPby0Xpc/aYTu09FhGzpyUx9kNjabwRj6kvlZiC4mXmALwZqFewiQ3dQe246r6I14pxVcMmE+JnLmawzVGQ5StyrHRqPUw33paOBoHdSx2zh8dwgwGA3RdqzOyzxblBjWpYBxtTzKVSmRTDiNvdsRv2XsPVpGoK6qgIiICIiAt1S6nOUWpSlXp8Z0KakozJiC9psWvY4OaQfULaog+gPInHlJ4gMgqFieaZCjQq9SPo1QguFx7XkMOK0jrrdYNM6sBR8sc18U4GjwXwhSanHgwg8WJhcxLD+iQsjHhGZnxKrgPFOVk9M3iUSbbPyYJ1EGMCHD4Ob968Y8WLLOPhvOOi5iS8oGyOKaf7J8Vo0MzAsHA+Za5p+BQe/eFzmqcXZOVDANQmA+dwhNhsIE+99FjXcw/BwePkr3IUTmNwbrDZ4bGYsbBPEXLUOJH5ZLFcjFpsZp2MQWiQ3eoLLejisxMtFDbEG4sg5WE830Oq1y8EWOnoVsoUTY2G+i3TSCCLtCDWRUtvuNb9bqHHuPuQVoCDsiiweATdBSXnoLKHN5fO6q+tdtraBQSRsglrm9xsipcBe/N9yINS4G5REQL/klCSDYuCIgm46odUIQeqCe5S9zaybgqUBQ5zWNL3GwAuSpXU82cVMwPllijFr3taaTSZmabzbFzYZLfvsgwf8ZuYkxmbxI40xBEj88tLzxp8o29wyDB9wAepBPxV73hCZeukMF4vzLmYID6rOQ6bLPI1MOCC5/wDid9yxf1WoTFVqU5Vpt5fGnI8SYiE9XPcXH9azh+H/AIOOCeFXB8GNCEOLUZd9TiG1r+1cXA/o2QWK+LRmNNYhzsouAocxeSwxTPaezB0ExHILnH+q1gVjAHVetcWGNI+P+IjHWIY0Uva6rRpeDc35YcM8jQP0V5MNEBERAREQFkL8I3OGJR8Z4jyZqc20StbgiqU5jjtMQ/diNHqwtNv6JWPQkDqu65L5hzuVOamF8wJCO+E+jVKFHiFptzQieWI0+RYXBB9FKLj6BWpHEdEkK9TI7Y0pUJaHMwYjTcOY9oII+a5BAUEXBB2KlEGCHjvyqOUfErimlQ2FkhWIorMieWwMOPckD0eHD4K37m8llb8XTKKVreXWHs4ZKSBnsOzf4OnYrW6ulYx9zm8mxBp/8wrFGgnm8lIN1Sg8kF/nhK5PQ8S5l13N2pyvPLYXlxJSLnDT6XGF3EHu1n++ssit34Ccq2ZU8NGF6fGkhL1GswjV5/3bOdEjat5vRnKPgriEBERBDnBrS5xsALkrBLx65yuzp4ksRVSSm3RqPQXfgSmAOuz2cEkPePzohe74hZgOK3NOFk5kHi7G5fyzMCQfLyYvYujxRyMt8Tf4L5+40eJMzESZjOLokZ7oj3E3JcTcn5oIAVSgGylBUxjoj2w2NLnPIa0AXJJ2CzR+HhwsQcissoeMsSS98X4tgw5mZD2AOkpci8OAOt7Hmd5m3RY8fD+yLbnZn/TBU5cxKJhm1WnwW3a8sP4uGfV33ArOKxjWNDGNAa0AAAaAIKkREBEXWsxcxcJZVYQqGN8bVaFT6VTYRiRYjzq4gaMaPtOOwCDmqrVqZQ5CNVaxPy8lJy7C+LHjxAxjGjcknQKx7PPxV8ssDTUeh5U0F+MJ+E5zDOPimDJNcOxsXPHpb1VknFtxt4/4k65GpkjMTVCwVAfaUpMOIQ6MP5yOR9dx7bBW1DlGyC5LMnxCOKLMedjxHY+dh+RiH3JGiwRLw2N7c55ohPmXLx2o5w5r1eMY9TzIxLMvJuXRKnGJ/wB5dPuFN7oO90TPfOfDkQRaLmlieVcDcclSi2+RK95ys8TXiVy+jMgV6ryOMacLB0CrQLRWj+jGh8pB/ODlaXeyi4QZo+H/AMSTJfOOak8PYjbFwhiCaIhsgTrw6XiP7Mi6DXsQFdtCiw40NsWE9r2OALXNNwR3BXzTtiFjg9ji1zTcEGxBV8fBX4hmJMsKlIZc5w1aPVcHxXNl5aeje/HptzYEu3fDHUG5A27IMvCLaUqq06uU2Wq9InYM3JTkJsaBHgvDmRGOFw4EbiyordcpGG6VNVyvVGXkJCShOjR5iYiBjIbGi5JJQb0kNBc4gAaklWZ8XniJ4OyRhTeCstTKYixnyuhudz80rT3WtzRCPruB+wCPMq3LjD8S+s4xNQy4yFmotLoxL5abrrTaYm27EQf5tp/K3PksfkSLFmI75iPFfFixXFz3vcXOcTuSTuUHPY6x5i7MrE05jHHFcmKtV59/PHmYx1PYADRoHQDQLgERAREQTfSyhFVy+aClFVy+agghBc54c+Z0XLfieoMtEiASGKYcShzQJsB7SzobvURGNH9Yq/7xPsu3Y24ZZ2vy8t7ScwhUJeqMLRr7EkwYtvICKHH8xYe8J12dwriikYlp0Yw5qlz0CcgvG4dDeHD9Sz349hyma/DtWQ1oiwcR4XixA3v7SXJH3oMEmV2K5rA+YuHMWycQsiUupS8xcfkh45h8RdZ+6DVZer0iSqksR7KcgQ47COoc0H9q+eCZgvlZiLLuu2JAeWehabfsWcPhDx83Mbh5wVXTEDozKe2TjOvr7SCTDdf9H70HvEKICAW6C3dbuESL31XGyzm3s47Lfw3m2voLINy3e47aBan1gRsVot0APW33LVh/VQC1oFrXJ2VXvdx8lTzD6x0AUgtJNtygg/WuCdVBsT7g1/YhAI1BJ7hQDZAuHG3mipFj7xARBrfNOtk06lEEp8VCIJCA2REEKvdUg2UgIJVuviCYn/grwn43mmxOSJOwIMgzWxJixmN0+BKuKCsa8XLEbqdkFQMPQ3lprGI4XOL7shQoj/8Ae5UGJ3DlKiV3ENMosFvNEn5yDLNAG5e8N/avoCrs9TMn8g56oMhMgymFMMPiNhg2DRBlzYD4iywl8JGFHY14lMvKALcr61BmX3FxywQYpv8AoW+Ky1+ITiVuFuEjG7xEDH1GDL02HrbmMWMwEfo83yQYOqjPx6rUpuqTTy+NNx3x3uO5c5xJ/WtuoF+1h0UoCIqTugqRUqWoIO6qQ7KlBmw8NbOGFmfw5yFGmpnnquD4ppM0w7+zA5oTvQtNvVpV2Cwv+GJnLGy14g4WEp+c9nRsbSpp8ZjnWaJth5oD/XWI3+us0CAiIg8/z+y/l80cm8W4GjyzY7qnTIzILXC/40N5mEefMAvnoqdOm6RUZqlz0J0KYlIz4EVjhYte0kEH4hfSsQHAgi4KwaeIRlDNZS8S2IGslRDpWJuWuU1zRZpZFuIjfItitiadiO6C2sC69J4dMrqhnBnPhXAkjAMRk7UIT5o20ZLscHRCf6oPzXm7Vkb8InKT6bXsT5yVGCfZSENtIp5I0MR3vRXfAco+JQZPKfIy9MkJanSrAyDKwmQYbQLANaLAfILcIiAiLRm5qBIysadmojYcGBDdFiPcbBrWi5J+AQYz/F6zkjiYwxkhSpsCHyms1VjTrf6sBh/xO+IWNMbr1DiczPmM4M9sYY8iTbo8CdqMSFJknRstDPJCA8uVoXmA2QSqr2VK3lHp8arVeRpUvDMSLOTEKXY0DVxe4Nt96DMh4X+UcHAPDzL4wnJBsKq4ymHz74jm++ZYHlgtv2sOa39JXiLr2XuG4GD8C0DC0tCZDh0qmy8o1rBYDkhgH7wuwoCIiCl72Q2OiRHBrWi5JNgB3WGHxE+KqPnhmXHwHhSqOfgzC0Z0vDEM2ZOzbTaJGPdoN2t8hfqshnH/AJ3NyX4eazGkKgZauYiH4IpvIbPDog9947crObX0WDRznPcXvcS5xuSdyUEoikboIVQFlKIKXKFLlCAiIgvt4D+Pak5IYaq2X+b8/Ox8PycB01RokOGYsWHEG8u3yd0voNV4rxT8aGZXEvXJiWmZuNRsJQohEnRYEQhjmA6OjEfyjtt9B0VviWCClS3dTYBEBERAREQFPMVCq91BKIiAdVnX4J8VQcecLmC5l8QRnQqcZCYJ1s+GSwj5ALBQsvfhOYh/CfD5UqK59zSa5Fhgdg9rXD7yUGMTiBwqME5140ww1nIySrEw2GLW9wvLh9xWRjwtcRfhDImp0cxg59IrcVoYfssiMa4emvMrSPEiwhEwtxVYgj+z5INZlpapQuxDmlp/xMK9h8J/EZgVXHmFHxLNjwpSeaO5aXsP+8EGTCWiuLbgjVclCcCLn4LhpN97Nv8AJcpBiX0G4CDfwyPS/mtUFv5WxWhDOo/YVrNdvtvfdANm9lUHA76Kk6+7pv13KczwbboJJJFi2yga3dY3vfRALG+nwS5aNbHtdQBa5vp8NUUOBIuS0+iKjURNehRAspNrKEQSl7qLXt5aqUA6IDZQpHkUE33IWNbxi62PZZbYcD/rOn51zb/kiEwH/EVkousTPi8VSLMZ14TpLn3ZJ0B0VrexiRjc/wCAIPPfDNo7arxXUSO5nN+D5CcmQex5A2/+JXgeLniGJT8hsN4ehut+FcSwoj9d2QoEU2+b2n4K2TwoZQTHEjNzB3lsPzLgfMvYF7T4xc44YZy5kebR09OxflDYB+tBjA63RE06lAJsqCQNyB6rvuSmUGKM9MxqTlxhOAXTdRifjYxaSyWgjV8V3kB99lmHyk4DeGjJXDMu/EWFKPiCpwGB03V66xkVrn21LWRPcY3sLXQYOudn5QVQPZZ5sQ8LfCRnJRo0pAy+whMNcwsE5RGQoEaEehD4NtR53CxWcZ/BxXuFvE0vNyMaPU8HVl7m0+oOb70KKNTAi20Drag9QD2QW2XKIiDlMM16cwtiKl4kkIroUzS5uFNwntNiHMcHD9S+hvKDHtPzPyyw3jylxmxIFZp8GYuDs4t94eodcL50b6Wssr3hJ51nEeXldyWq0UmcwtHE/TyT9eTjk8zAP6ERpP8A2gQZAUREBWHeLXlNDxRlHQ80JKDeewlOugRnAaulY4AN/R7GkepV+K6PnZl7T81MqsTYDqUERIdWp8WEwH7MTluxw8w4AoPnYYC4hrRckgAdys9PBLlTCyh4b8I4efLGFUJ6VFUqHMPeMeP75v6NLW/BYi+FjJCezF4nKJltUqe+LApVTfEqsN7dGwpd/v8AMOxIA+KzzQIMKXgsl4LAyHDaGNaNgALAINRERAVt/H5nNDyc4dK9MS0YsquIYZo8gAbHnighzvg25VyCxHeLTm3HxNm3SMqpKYDpDCsmJiZY03vNxhfX0Zy/NBYfyi56qUQaoJA7r1zhMw2zFfEjl7SIsIRIZrkvHiMOzmw3c5H3LyRXJ+HdJMneLfBjYguIRmIo9RDKDOUAALDopUXupQERR8UGJzxdcxH1nNLDeXEtGDoFBpxnY7Ado0Y6XH5oB+KsEA6lXJeIhU4tT4ucbuiOJEu+Wl2+jILQrbkBS3dQqmoJRE06lBS5Qqj72qgixsghERAREQEREBERARF67wxcOmKOJbMqXwRQYhlJKCz6TU6gWczZWXB383E6Ad0HkVx3S47rOtlvwScL2TtAl4EzgSiVWZhNAjVSvsZHiRX9T+M91voAtTMLgr4Ws4KLHgw8v6DIx4rCyFU6C1kvEhO6G8L3XW7OBQYKEXrnE7w64o4asypjBVdLpqQjtMxS6hyWbNQL2v25hoCF5ETboglZMPB3rrokjmVhp8UAS8anTsNnX3hGa4/4WrGcDdX5+EJVTLZ0YyoxdZk7hsRyP6UKYhgf/cKDeeL7QBK5p4IxKN6hRI0o63/UxQ4f/eK6L4YVTMrnvU6fcWnKJFJHfkew/tXtXjHSTWyuWFSA94xalAv8IJ/Yrb/DmnvonEzTYRP/AK1S5yD/AIWn9iDMLKxQCNgf1rlpd+58l1+TeC21lzUq62g1vr6hZ0crCOup08luh7x5VsoL/dJGl+i3MPXRoK0NS7g0kjZU2JFgL+akt5bkj5lCSRZBItf94R5a5vp5qHOsbDp0S9vrHfqgWP5W4vqETQ/W17IgqD79FV1uqS21zdVC/U3+CAosbXAvZB6qfigKVCIKrAb6qn9ykkWsAmljcoI1tqbrD34s0d0TiXp0MuuIWGZUADpeLFKzCHVYd/FihOZxNSUS3uxMNypHwiRUHLeEc0Oz/wAQOO7cNvt/bMXpfjGuPsMuGHbmnj/9teYeEjGEPiCrsM7vw5Et8IrF6d4xjCYGW8X7PNPj4/i0GM9QT5KVSd0GRHwd6LT5rHOP67GhMdNyVNlYEBxGrWviOLrfohbTxaM0MafxnUXLKBU5uUw/LUxk8YEKI5jJmNEcQXOt9awFhfZeOeHvxC0jIPO3nxXMGBh7EssKbOR76S7+YGHEd/RBuD6rJjxQcJWW3F/himVQ1o06rycPnpddkgIrXQXC/I9t7RGE2O9wRoRc3DEnwp5uY0ypztwpU8NVWdbBm6nAk5yTZEcYc1AiPDHMczY73HYgLKx4jWHKZibhIxVM1FjREpYl6jLEjVsVrwNPUOcPivOeGzwwMMZO48kcxMeY2OKZ6kRDGp0nBlPo8vDij6sSJdzi8jcC4F+9l1jxUeJPC0tgJuQOGqm2crtSmoUzVhBcCyVlmXIhvI+053Lp2BugxWhum6lBsiCHK4XgMzUiZVcSWGahEmjBkKxENJnbus10ONYC/o4NKt65QtWWmZiTmIU3KxHQ40CI2JDc02LXA3BBQfSy1we0Oabgi4KleQcJubclnXkJhXG0vMe0mjKNk59pPvMmoI5Hg+tgfQhevoCIiDwPK/hfo+XPEdmHnXJMl2QMWQZYykBg1gxSD9JPlzOax3nzFe+IiAiIg4bGOKKVgrC1VxZW5pkvI0mUizceI82AaxpP7F88GauOqnmfmRiPMCrR3xpiu1GNOEuN+VjnHkaPJrA0D0WV/wAVLN2HgrI2Xy/k5hzKhjGZ9i4NNrS0OzohPkTYLDwgWsg3VSICuO8PWfZIcWuCXPdYR4keCPV0J1lbivUuFvEkHCXERl/XZqMIUCDXZZkV5OjWPeGk/IoPoLGylUtsRzDYi4U7/BBKKLpdBgy8Q+mR6ZxcY2bGZyiZfLzDD3a6C03Vt6yCeLrlq+lZi4ZzQlpYNl6zImnTMQDeNCJLST3LTb+qsfaApaoUjdBUouFKoQVXChxubqEQEREBERAREQERDqgLK/4QOF6XLZT4uxfDY01GfrX0KI6wuIUKG0tHpd5WKBX5eFhxC4ey6xlWcq8X1VslJ4qdCjU6LFcBCbNsBBYSduZpFj3AQda8TrNzHNb4hKhgJ9XnpWhYfl4MOXk2RnMhRHPaHOiFoOpJNr+S4nw5M78f4O4h8OYFlK1OTOH8VRYkjPSER7okMH2b3MitBPuua5o1HQlX98W3AVg3igqctjOSxNGw5iWBLiAZpkAR4EzDGrfaMuCSOjg75rj+E7w9cF8NWI3Zg1zEhxRiWFBfClY75f2EvJNcLPexlyS8i45idAT3QdX8W7DFLqPD/R8UR4UMT9Hr0CHAiEe8YcZrmvYD20abf0ViFWQHxSOJ3DmYlSpWSmCJ1s7J4fnHTtXmobwYb5kNLGQmkb8oc8k9yOyx/IKmq9PwnJh8PiUqUEi4jYXm2n4R5cqyxqvS8J2E5/EvPvaNGYZnCfL8dLhB7h4xrLYQy0eRtVJ1vzgt/crQuAmO6BxQYU5TbnbMs/7l37ld54xcUHCOWsIn3jVJ51vSC0ftVn/AhCMXiewnYX5PpLj/AGLkGZWQJI1bY6aea5uWd7oItYfeVwEg9oAaWG4I6rnJaJoGt+KzZg5aA4EXta4C3UOxuCQCtlB/K8lumO90grQ1zdtwDv1soF+hVNzcOvsq7jq0HVA5iTY9EH1eipPLcW26qQXC5aLi9/RBPKCAXuOuyKLi9r6/ciCoEE2vY2sqgSd1AF/tEqpBAFu299lIACa9CoF7WDgb7FBIFuqgkg33BUm5FgN0Gm1vkgdbICOikeZUtQUnUELEj4utMiS+e2GKoWnkm8OiGCephxnX/wB4LLcsZ/jG0ZrZnLXEDYY5iyoSj3231hOaPucg8n8KKbbLcS8zBcf/AFjD8y35OYV7b4xkq44ay6nNbCdnoVyO7IZ/Yrc/DHqTJHiuo0J7rfTKdOQAL7nkDrf4Vdf4wNGfM5NYNroFxI4i9gT/APNgRD//AM0GJ5ugU2QbIgFe6ZM8avEPkVTW0LBeNTGpDDdlOqcFs1Ah9wzm95g8muAXhaILs8XeJ9xV4rpUakQq3Q6EyOwsfHpNN5I1jvZ8Rz+U+YsVarUalUKxPR6pVZ6POTky8xI0ePEL4kR5NyXOOpK2yICIiAiKHGxsgyP+ENm79CqmK8lqjFPs50NrVOudA9oDIrR6jkPwWUBfPXw5ZrVDJfOXDOPpCNyskpxkOaaTpEl3nliNPwN/gvoJpNTlKzTJSryMVsSWnYLI8J7TcOY5oIIPoUG6BupRRvsUEooJspQEReb8ROZkvlBkxirHsWOyHFp1PiGW5j9aO4crAO55iEGJjxK86f41eIyfw/TogNIwTCFGgFpuIkwDzR3/AKZ5P+zVpy3FSqE5VqhNVWoTD481ORnzEeK83c+I9xc5xPcklaAF0EoiIC3FPm4lPn5aoQXFsSVjMjNI6FrgR+pbdEH0bZYYql8cZc4axfKRWxIdXpctNhwNwS6GCfvuuyqynwr844eNcjo2XNQnvaVTBkwYLIbnXd9DiEuhkeQPM34K9cjS4QQpG6hEHhHGzkeM98gq7hqSk2xqzT2fhKlG3vCPCBPKPzm3b8VgfmYEeUmIsrMwnQ4sF5hvY4WLXA2II9V9LJFxZYnvEo4OBgauzGe+XFJ5aFV4xfWpOAwlsnMuOsYDox51PQHsCgsDUjdRcIgrVCm5UICIiAlx3RGw3xHthw2Oc55DWtaLkk7AII5lNyd1lB4NfDnwdW8oZ3EufeHI0SqYslgZGWe50KNTIB1ZEbbVsQ6Gx6aEbq23ix4A8w+H+YmcTYXgzOJMGc5LZuDDLo0o3oIzW9B+VsgtQROtkQEREEEX6quE+JBeIkKI5j2kFrmmxB7gqlEFzmVniMcTuVVFl8OyOJKfiCnyrBDgQq5KGYdDaNgIjXNiEDzcVGaHiJ8T+adGmMPTmLJOg06bYYceFQ5T6M6Iw7tMQl0QDp7rgrZFNygqeXxIjosR7nvcbuc43JPclUndLlQgkaXV83hFyXt8+8Tz9j/m2F4rb26vmYH7irGmrIx4OlEa/EWZmInAAwJOnSbCR+W+M46/9m1BzHjFzgdKZZU+4uIlSjn5QB+0q2Pw9ZR0zxK0yML2ladNxj+iB/4l7r4wdUhxMeZf0ZsS7palzkw5t9vaRIYB/wAB+S8p8NaT9tnzPTnKD9HoccfFz2D9ilGVunRPagEnUW0J1sudlN79F1+QFjdt+2pXPSpDLAqDlpf6p+VlvYdiOawHZbGEDa4/Wt4x3e2oWhqAHp8VVe7tRoqbkX19Sp+sQC4oJFmnQk6o4i1hb5KRYb6BQQCeYtvbSwQQbW97cogvq25H7UQapPL0HwS17jm07Jfm3PW2iktcb+9v5IDr9ChDidHWHayOtoCdFNwNyB8UA8wBOiJbX9yHa6ApUCwTXoUEqwvxfaC6byWwliFkPmFOxCILz+S2LAiftaFforZfEfwqMU8JmLA2HzRaXElajD01Hs4zb/4SUGK/goxRCwjxS5eVeYfywXVUSsTzEZjoYH6TwsoHiZ4XGJeE6vzTG8z6JPSVTZYbWiezJ/RiuWG/ANYOHsb0Cuh3KafU5WZv25IrXfsWerO7DX8afDvivD8swRYlcw1GMvY7xTB54Z/SDSg+fYbIpdCfAe6BEbZ8JxY4diDYqEE2KhV3uqSNdEEIpsVIFkFKKs7FUICIiCOUHQrNx4b+bELMvhro1NmZ/wCkVTCj3Uiba513tY3WET5FhA+CwkK9PwtM54WX2d0zgCqxiym40lxAh3OjJyHcwzbzBcPkgzFqCpVJQCQdlCIgqvdY4vF4zjgSVDwvkpTZoGZn4jqxUmNd9SCz3YLT+c7nP9VZF52cl6fJx56aiNhwZeG6LEcTYNa0XJ+QXz+8VGbE3nVnzi3HseMXy8xPOlZFl/dhykH8XCA7Xa3mPm4lB5QpanKgFkEoiIBNlHN5IRdQguD4HM8IuSGftDq83NCHRqw8UuqBzrN9lENmvP5rrFZ2YMWHMQWRoLw+HEaHtcDcEHUFfNKxxaQ5pIINwQsynhxcU0vnDlrL5a4omwMWYTl2wOaI+7p6UbpDij+k0Wa70B6oLxzoiqIv1VJFkFQNwtpVqTTK9TZmj1mQgTsjOQ3QY8vHYHsiMcLFrgdCLLckg7Kq4QYoeMfw1sQ4Sqc1j3h9o8aqUGOXRZihwjzR5I7n2IOr2eW4Vg87ITtLmokhU5OPKTMFxZEgxoZY9jhuC06hfStcLxrOvhEyGz7gOdjrBMqKlY+zqkj/AJtNsJ6mIyxcPJ1wgwD3vsiyQ5jeD7WIc1Emcrc0ZeNKkkslaxK8sRo7e1hmx/RXlM54U3EzLvLYEfDUy0HRzZ1zb/NqCzRFenSvCf4kZ2IGz9SwxIs6ufNPfb4Bq9zyt8ITC9Piw57N3MKbqxFi6RpMP6NCPcGIbuI9LIMa2DMDYvzDrkDDeCMOz1ZqUy4NhwJWEXn1J2A8yspXBZ4clPyxmJTMzOyWlqliVgbFkaSQIkvIO35n30fEHyCu/wAs8mMsMn6PCoeXWDKbRpeE0N54MEe1ieb4h9558yV3YWGyALNAa1oAAsAOiomJeXnIESWmoEONBitLHw4jQ5rmncEHQhVIgsG4tfDKwzjeDOY6yJgwaJX7OixqPfllJx255P5tx8tCsXeNcCYwy5r0xhnHGHpyjVKWcQ+BNQy0+oOxHmF9H4N15PxBcM+V/Edhd2H8d0kNmoQLpKpy4DJqVf3a7qO7ToUHz9IvT+I3JJ/D9mlUstn4pka99Bs9sxK6FrXahsRv2XgWuLrzBAREQSNVPL5qBupuEDl805dL3S4U7iyCGrK94Q9ChyOUmL8Quh2fUa0yDz92woWg+BefmsUIFlmr8NPCsfC/CzRJqag+ziVmamKhrpdjnWafkEFiPij4tGIuKCYpbHgw8P0eVkf6xL4h/wB8LnfC+pD5nHGMK6GXZKU+XgB1ti95P6mrwrjJxHDxVxMY+qkF/PDFVfLtd3EMBn7Fdv4YFB+hZe4pxGYZDqhVmS4d/RhQ/wB8RBfdJat5tNey5+WB90DsuAp7wQCfLquwSYsA73fS1lMHKQNBY62sVu2HexW1gWIFzqe63UM2Fu6aNW5BsDYW+akuJ92+ip05rgWCqvcXtt5KiXDl+Kk8rgCD9yi5cL/el9OUm3wQGgkE32RC61tb/vRBqhlha607C9wN1OpJFtXeaAiwPQ90FQNgTueuqEk7nlsoa4ONwdRuE2uSL3+aCrW7gD2UkXUO2t0Q2Ol9UEggmwKWPXRBta9/gmvQoC874isMxMY5GY3w3AZzxZyiTQhttfmeGFzR8wF6ItKahMjy0WBEF2xWOYQeoIsUHzYubFgRXQ3jkiQ3FpHZwNj96z28JeL25i8NOCKvHfzRY1HZKR7m93wwYbr/ACWE7PvCLsB504ywk6EYYp9XmGsb/QLy5v3FZQPCqxuzEHD9NYVfFvMYcq0WDYnaHFHO39qDFnnZht2Ds3MYYadD5PwfWJqEG2tZvtCR9xC6UrqfErwKzBnE/WJ2XgmHBxDLQam0nZziOV5HxarVkFadLoiAiIgHYqhVodigoREQFyuFMR1LB+J6ViqjzLpedpM5CnIERpsWuY4EfqXEnZQNEH0Z5T47kcy8t8O47kIrXwazT4M1dpvZzmjmHwN12s3uVYV4Tec8LFGWNXyfqk4XVHCsx9Kk2vdcukoxJs3vyvDh5BzVfoTrsgIiILeuPXNiFlNw2YlqEGc9hUa1DFHkbOs50SNcOt6MDisFBBJuTcq/DxZM6f4WZqUrKGlxyZHCMuJmcAPuvnIwvb+rD5R6ucrD2oJREQEREBUndVJYIKV3TJ7NnFmSmYFKzCwdN+ynqbFDix2rI8I/XhvHUOGi6WbdEQfQPw3cRODeJLLyWxpheKIE0y0GpU97gYsnMAatI6tO4PUL1gtv1Xz68PXEVj/hwxrDxbgqdvBilsOfp8UkwJuFfVrh0PZw1CzZcO3EjgDiOwVAxRhGehw5xjA2oUyI8e3k4vVrh1F9nbFB6t1siHVEBVA3VKIK0VCkk30QVKlyXS5QQiIgfFERBIKtZ44+MmmcNmEzQMNxJebxvWYLhJQCQ4SbDp9IiDy+yDufJU8ZPHBhHhyocbD+G5qWrGOpthZLyLHhzZK40ix7bAdG7krDTjnHmLMy8Uz+M8a1qZqlXqMUxY8xHeXHXZrfyWjYNGgCDjq1XKviWrzlfr1Qjz1Rn4zpiZmY7y+JFiONy4k+a2SbIgIiICIiAqhsqVU1BXChmLEZCbe73Bot3Kz9ZXyEPK7hvocvEYGCh4YZHitOlnNg85HzWEnhzwN/GTnngnBjoJiwqhWJf2zQL3hMdzv/AMLCszPGpjuVyt4XMbVYPDIsWmikyTQbExY5EFoHoHF3o0oMGmK6vFruJqvXJhxdEnp2PMuJN9XPJ/asrfAxgt+DOHvDkOah/wCcVX2tUig6fyrvd/whqxN0mnx6vVpKmQWF0ScmYcBo7uc4D9qziZd0OHh7CFEocNpa2QkIEvoLW5WAIkd7p5vYnvfyXYJNvunbuuBp7XBjb2NzfRdhlAbAE62BUquRg/H3Vum2IJO+4W2hatv0tv3W5aARrv3SCvnt1HmqhcaDbsqR2VWhO+iokkbIRsdN0HQj4aJqQCdb7IB9+17aBFLgdyAAimwVXH/OiddAfJUDmG4+5VAG1yLA6qgLfEnTRCpAve7QLKkFoAHMPgEFdx389VLbHq5RZu5trf4I1xbuN0FYIOoQX6m6gXcL/JNAdT8UEkgalNSCCdUJFrXCi4tpYnt3QYe/FSy9h4V4hJXFsrLezgYppbI73jZ8aESx33ci7D4TGZUvh/NyvZc1CYEOHiWnfSZQOOjpmAb8o8yxzj/VVwPivZZHE2SlKzBlYHNM4TqA9q9rbkS0ccjte3MGfNYxcl8wp3KrNPDGYMkXF9FqUGYiMabc8K9ojPiwuHxQZFvF6yuZUsvsK5tSUpzTFDn3Uyditbr9Hji7C49g9gA/PWK5Z/8APTC1Kz64ccS0GUhNmpfEVBM1Iki/40NEWC4eYe1pWAablI8hNxpGahmHGl4joURhFi1zTYj5hBpXsgvdQpG6CpERAQ7FEQUIpO6hATTqURB7nwXZuzOTXEJhjEf0n2VPnZgUyogus10vGPKSfR3Kfgs80KNDmITI8F4cyI0Oa4bEHYr5qIcR8JwfDcWuaQ5pG4I2WcHhD4o8uscZAYWqOK8fUWnVuRlvwdUIE/Pw4MX2sH3eaz3AkObyuB80FzG2q4zE9ekcLYcqmJalFbClaXKRZuK9xsA1jS46/Bdcbnhk2P8A3p4V/wD9aB/+StL8SbiZwfI5FPwLgHGlMqdSxVMCVj/g6cZGMKWbrELiwnlvoNd7lBi1zSx1Usy8xsR48q0QvmK3UY00STs0uPKPQCwXWFSqgLICIiAiIgIiIChylEFNyu05cZmY4ynxLLYtwFiCbpFSlXBwiQXkNiAH6r27OaeoK6wiDL/wxeJjl5mbAkcLZuPg4WxM+0L6U42kpl3Qh3+jJ7HTzV6slPSdSlYc9T5uDMy8ZodDiwXh7Hg9QRoV81gJGoXtWR3F/nnkDHZCwXi2PHpPPzxKRPuMeUf3s0n3Ce7SCgz4Isf2Vvi4ZeVkQJLNPBM/QZhwAiTUi4TEC/flNnAfNXO4J4wOHDH/ALKHQc1qGyPFtywJyYEtEv2s+1z6IPZNeiLaytSp8/DbGkp6BHhuF2vhxA4EdwQtyCLXuCglEJA3I+a46rYkw9QZZ85XK5ISECHq6JMzDIbW+pcUHIovA8c8dHDFgNsUT+Z0hUI0K94VNvMuJ7At0+9Wo5teLxBMrM07JrADxMEFkKo1h3uj+kITfnqUGRTE2LMMYNpcWtYrr0jSZGCC58ebjthMAHmVjp4r/FEZ7OdwLw6RA5z2vgTGI4sP6oOh+jtPXs8/BWIZs59Zs531X8L5lYznqs9t/ZQXP5IEEHcMhNs1o9AvPwPNBuqpVqpXalM1etVCYnp2biGLHmJiIXxIjjuS46lbVEQEREBEUtQQiqOypQFU1UqQbXQX5eEtlhAxDmzXszahKe0g4YkPo0o4jRkzHNi4HuIbXD+uvQfF2zV5ZLCGTdPmP5WLErlSaD0aPZwGn15op/qhe8eGxle/Lnhsp1Un5P6PP4pjPq0cuFnGG7SFfy5QPmsavHHmX/GhxJYrqsGJeTpsx+C5WxuPZwfduPV3MUHAcJ2Em4yz7wtTYsD2sGWmDPRRa4DYTS65+NlmNkG2a3lGlgf2LHx4amXsR07iTM+blRyNY2kST3Dckh8Ug/CGPiVkOp8M6EAbdPvQc5TtGDz3C56Ws4A362XESTbN0AuRqual2NuBr3QchDaGgaiy3DAANButGFYAkA69lrDoVIKrEdFPn2UW08gbqqx6n7lQ2ACk2JuDuqXDmBPLfT5KS4WsdO6Bt2RQdO2iIKw4nYm/WylrTe99VTqb3Pkmmw5T8FLyKgbdPuUA2O1wlty7dRe3TqqNQ26D/iFDb3uCjdHc1jr1soJG5sAgq5iBYaXU6nc3VNyfdFte6q5xbVADrqfraa6frUc1+g0+KqBv2QdSzXwLIZl5bYjwHU4TIsCt06NKWc24Di08jvUODSPML57cT4dqGEMS1TC1VhOhTlJnIsnGY4ahzHFp/Uvo9N3fVssNvid5Tuy/4gH4tk5YQ6fjKXbOsLRp9Ib7sQeux+KC/Lw7c1Tmfw3UqUnozYs/hlzqRMa3JawAsJ9WkfJY1ePbJ6Yyg4iq7Lw5QwqXiF34Yp7gPdLIhPO0eYeD9y7/AOGNni7LXPFuAqvPeyoeOYYky17rMhzrA50B3lze8z1cFdr4pOSkHHmSsHMqRliavgmP7UvaLl8lFs2K0+juR3wKDD+pBsoGqIKubyTm8lSiCrm0tZRcqEQEQ6KOYIJRAbogJc/lFEQTzO/KPzUa9SiICIiAiIgIiICIiAiIgIiICIiCrm8lT1vqiIOZpeNMY0K34DxXV6dbb6LOxIX+6QuzSvEFnzIs9nJ51Y5gt2szEE0B/vroCIO9zmf2es+z2c/nNjiYb2iV+aI/311Wq4mxFXIhiVqu1CfedS6ZmXxCfi4lcciCS4nckqERAREQEREBERAUjRQiCSbqERAXoOQWVtSzmzdwzl5TIfManPMEw47Ml2nmiuPo0H42XnyyReEjkuyZnMRZ31WTdaXH4Ipbnt05jZ0Z476BrfiUF7ueeOaVw98PVfxLIQ4UGHh2jCVkIWzXRi0QoLQPzi3bzWBGZmZ2sVKNOTD3x5uejGI8nVz4j3XP3lZF/FrzmdGj4cyRpU97kEis1SGx27rFsFrvQF5t5hWa8L2XMXM/OmgUIsvJykX8IzrrXAgwveI+LuVv9ZBkt4ZMvhlxlFhzDJhiHMNlhMzNhY+1i+8b29bfBe5U9gIbZoud1wNJgthQ2Q4AsABYDSwXZpFjtC8kkbboOZkme7o3bSwXMyoHu3GhXFykMn9evRcvLsbbYWaL+ql7G7YRoLEX1utcWA33Wk2+21+y1QzzVFWtrhS12oIOvZNRqALjbRTfsRcoA37m2g1UC99+tktpbVDqBcg9UB1jvYHcIoFxbXZEFRFu/wAVLTuB13Ci5B5rp8b+aCQL/UQjcm9gLoNFJBH1j80Dcowa3QaXF+qXN9CgqBbbf3lW6+gv6qkAB12jW1wpJPQJwKibICSSD0VNyG83Uqeby6IJVqfiNZFnOLIWcrVGknR6/g9xqkoIbbviQQLR4Y73b71u7FdUDbuVTGgwZqA+BGYHworC1zTqC0ixCD5v6DW5/Dlaka7TYroM5TpmHMwXjQtiMcHD7ws9mU2MMPcSmQFOrUwIUzKYjpTpSoQSbhsUs5IjSPJ11hz4yMl5jI3Pev4bZB5KZPxnVGmOAs0y8RxIA/NNx8FcZ4VXEGMJ40qOR2IJl30DEp+l0pzne7CnWD3mW6c7PvYO6C0LiAykrmRubFey9rUB0MSUy58m87RZZxvDePK33grzxZaPFQ4eYmOsASOc2G6c2JVcJgwqlyN9+LIuP1vPkdr6OKxLNItuglERAS6K5Tgk4RanxO45fMVYxJPBtCex9UmQDeO46iXYe5A1PQIPN8n+G/ObPacZL5b4KnZ+XL+SJPvb7OUhHrzRXaadhqrs8PeD/mnPSzH4jzOodMiubd0ODLvj8p7XuFlGwjhDDOAsPSeFsJUeWpdLkIQhQJeAwNa1oG+m57leWZncZXDplLUX0bFuY8h+EYWkSUk7zEWGezgy4afIm6CwDFvhE5xUqTiR8J48oNbisBLYMVj5Zz/IE3F/VWhZoZLZo5M1X8D5lYNn6JGc4thvjMvBjW/IiD3XfArN9lXxj8POcVR/AuDcwZM1JxsyTnAZeLE/MD7c3oNV37MzK7BGb2E53BmO6FLVKnTsNzCIrAXQnEWD2O3a4dCEHzmg3Rey8U/DdiThozNmcIVVj49Jm+aZo89ynlmZbmta+3O3Zw9D1C8aQEREBERAREQe78MHCBmNxRzdTdhOakqdS6OWsmp6bJ5REcLhjWjUm2vkrjR4P2Zp3zOoQ/7CIrcuF/i9zB4XZ6pHDEnJ1Ol1bldNSE1cNMRuge1w1abaeauQPjA5jX0yuotv/wCVEQUf5H7Mv/afQv7vET/I/Zl/7T6H/d4ir/ywWY3+y2if3qIo/wAsDmOP/ddRP7zEQQfB/wAyz/7z6H/d4if5H7Mr/ahRP7tEU/5YLMj/AGXUT+8xFB8YPMn/AGX0If8A1ERA/wAj9mV/tQof92iJ/kfcyftZpUP+6xFH+WDzL/2X0L+8RFP+WBzK/wBmFC/vERBWPB8zGtc5qUT+6xEPg+Zj/wC1Sif3WItP/LAZl/7MaF/eIij/ACwGZv8AsyoX9vEQWv8AEtwv4+4YsTylAxjFlJyXqMExpKdlCfZxQDZwsdQR2Xji9o4m+KbHXFBiSRrmLZOSkJalwTAk5OUB5WAm7nEnUk/sXi6AiIgIiICIiAu4ZY5R5i5x4hh4Zy4wtOVmdcQInsWfi4DT9qI86Mb5lej8L/CHmPxNYgZCokB1Nw3LRQ2oVmPDPs4berYY+2+3T5rNFkjkVl/kFgqVwbgWlQpeHCY0zU25o9tNxQNYkR3Uk/AIMd2FfB+zAqFMZM4szRpVLnHN5jLS0q6OGHsXXF/gvLc9/DWzyyeosbE9FdL4wpMqC6YdTmOExBhj7ZhHUj0usneKeM3hswXjL+AlfzQpkGrNiCDFa3mfDgv/ACXxGgtafjp1XsspNyNWkYU7JTEGalJqGIkOJDcHMiMcLggjQghB81OxsQQRoQdwiu68SzImkZP53txBhmUhytHxhCdPtl4beVkGYBtFDQNgTr8VaID3QSiIgIiIOZwbhOrY6xVSsHUKXMafrE1DlIDAPtPNr+g3We7L3C+FeGrImTo8SLBlaXhSkmPOxtGhz2s5ojye5df5hWAeFXw5zNdxXN5+Ylp4NLo7HydGERtzFmnaPigdmNuAe7vJeq+KxnvCw5gOnZJ0eac2o4je2bqIY63JKMPutNvynjb+igxyZ6ZpVPObNXEWYlUfd1UnHugs6Q4ANobB6NAV6nh7ZWfgHA9QzEqdP5J2vRRClYkRtiJaHtbyc438+UKxHLvBdTzExtSMGUlnNMVSZbBBsTyN3c4+QaCVmUwNhmRwph+m4dp8INladLQ5eGPJoAuP1oO20+G1oaADfddjkIRIF72vcG64anwL2ceh9bBdmkWcoFreY7IORlWEakLlJdgOtvitnLt0sTa638G3Rx1Qbljdj0WotPpa99LqtxG+ncoKtLhxt5WQkkEXUE9kv1J1QU2IVV7Cyi5NroBY2HVNE/cijmNyb2HdEFY069dEBNrE3TmB8r90Bc3Y7oCqFyb3JUB1/h180tzaa99UFXvatI3+8oDqOb3SOhUNFgTrfoot9roEGoT+Set0a1p1vdQxzb31v6WugfcXI18kFZ94W2VIN1VcOZfRUn70C7m9N+yqbc9bjoqQHW1GiADluSQCpBaL4jnDY3OfKN+N6BKMOJ8FQ4k5A5G+9MyhsY0E23IA52+bSOqw/wCFMS1bBeJqZiqizESWqFJmoc1Ae02LXscDb7rL6NZmBCnJeJKzLGRIUZjmPY4XDmkWIPwWD7jo4d5vh/zpnIMjKFmGsRF9QpERo91rSfxkL1aTt2IVGW/IXNfCvE3klJYnEGFMwarKukavJxACGRuXliw3Dsb39CFhu4w+H+Z4d86qphGBDcaJPE1CjxT9qXeTZt+7TdvwC9Y8OPiV/ibzQ/gJiOdLMMYviMgP9o+0OWm9ocXXQA35SfRZAeOHhcpvEnlZFiUiFAh4toMN83RpsDWKLXfAJG7XgC3Y2QYOUWtOyM3Sp2YplRl3y81KxXQY0J4s5j2mxBHkQtFAsSQGi5JsB3KzwcDeUUHJ7hywvRnMb9PqkuKtPuAsTGjDmsfRvKPgsFVILBVZIxbezEzCL79ucXX0a4EfLvwXQnShb7E02WLOXa3s22QWXeJRxhVrKGnQMmsu5oy2Ia9JmPUZ9h9+SlXEtDWdnvs7XoB5rErFjxZmK+PMRHxIsQlz3vddzidSSSrnPEng1aFxcYqNT5+R8vJOlS7YwfYttbyvzfG6teQbiXmZiUjQ5mVjRIMaE4PhxIbi1zHDYgjUFZjfDc4oK1nll7PYLxvOum8SYREJhm4jrxJuVdcMe7u4EFpPXRYa7nuvTMieIfMbh2xBP4ky4nJWBN1GV+iR/pMERWFnNzDQ9Qf1oMrviX5Ry+ZHDhUMQS8qx1VwbFFVlonL7whaNjNv2LbG3doWFVXJY28QPiax9h+pYXr2LpM0yqwHS01AhSENofDcLEXsrb+XW90FKKSLKEBE16lEBERAREQEREBCLoiCALdVKIgggnqpREBERAREQCbGyA3UEHdeyZF8JWd+f86xuCsIzMKlXHtavPMMGTYPJ5+ufJtyg8cW9okxTZOsSM1WZAz0hBmIb5qWEQsMaEHAuZzDVtxcXV3nF5wBzfDjljh7HNDqs1XA1/0fEEYMtDgxXfUewDZl7i57hWccp6oPoD4W8WZS4xyXoFUyYpsrTcPMgCC2QgsDTKxWj34bx1eDuTvuumcds1n1JZD1abyHihk5DY41YwG3nBI8p9oZfs4DUka2vbVYuuDbi1r/AAy43aZt8acwhVYjG1aRDiS0Xt7aGPy2j5jRZusN4jw/jjDcliTD89AqNJq0u2PAjQyHMiQ3i4/XqEHzdPjRY73xI0Rz4jyS5zjck9SVm88OH+HP/wClvD38NxNfykX8GGZvzmSv+L315d7eVl0qveGFlLWs+IeZTY5gYWivdOTmHobbQ4k1zA2BG0M6ktV5tPp8jSZGXplNlYUrKSsNsGDBhNDWQ2NFg0AbABBjH8ZCryDqvl3RmcpnIMGcmIncQ3Fgb97SsbwIcLhfQZnVwxZL8QEGF/GXg+BPzcvDMKXnmOdCmILSb2a9pvbyNwrMs1PCEokeBEncocfx5SYbdzZKqs9pDd2aIjdR6kIMYTVK9Vzw4X85+HmchszHwpFl5CYf7OXqcAiLKRnfkiINA7f3TYrypAXbcpst65m7mNQsucOS7os9WptkAWGkOHu+Iewa0OcfRdSKy7+GpwuS2WeBW5w4rpjf4T4mgf5l7aH78nJO1AAOxfoSe1gguSo1LwXww5FtlYYhytCwdSzEjOGhiOa27ie7nO/WsHOeubVbzwzRreY9ciP9pUo5+jwi64gS7dIcNvYAffdXq+KHxT/hebbw8YLqB+iSb2x8QR4L9IsQasl7jo0+87zsrIMm8sqpm7mBTcGU4FrI7/aTcaxtBl26vcfhoPMhBdx4fWT7JWnzebtVgtMee5pKmlw1ZCB9947cxAF+wKvppsIEB4sXHtuPJdYwThOkYSw/TsMUWVbLyNNgNgQWNbYWAtf4737rvdMlgGtFrdht9yDlKdL6baftXYJGGQG3YN1x8nLlos3bYkrmpeE1zQ6+yDdQGDvot9BAHvWF/RbaENLC2q3ZsNyp6NVgsbXGvdV6Hr/5qNLaHdDckAnS1lQANrm//FSdRfT0UWsNB62Um1zc/wDFBDgAB08ioGuhFgdlJta407JcjU/NANzod0UNLS7Ww9dEQV2HdQ02IO6qGhNxfRU31BGhGyCq+2qqaBrp0VI+aka3FweuyBzb62upuDre9t1SfeO6m99DeyCbE+8OgU3F9Re3RAASbm3qjSQSB80Ek3UtvqTY6X2UaeXn0Te/M7dAIsp90aXv5WTcak3I3/YgJ3Frjuggl5Fx/wAheIcYHD9IcROTlSwv7GF+G5AGeo0w4XdCmGg+6D0DxdpXuDDY6ahREDhc9P1IPm/q1Iq2Ga3OUOsSsWTqFOmHQI8J45Xw4jDYj5hZefDk4pYOb2Xrcs8XVdjsW4ZghkIRX/jJ2TGjYgvuW6A/BeR+J7wsOmILOIbAtKJiQgIOJIEBm7PsTNh2+q4+ix+ZbZiYmysxrSsd4QqMSTqVKjtjQ3sJHO2/vMd3a4XBHYoL3/E64R56iVmLxC5f0l0alTthiKXgM1lY2zZiw+w69nHobd1jxabi6z/5KZrYE4qcmGVuDBgTUrVJZ0jWKfFIcYMUttEhvb8bi/SyxGcZ/CViThnx5Ejy8rFmsHVqO99Jn2sPLD1J+jxD0e0bdxqNigt1BIIINiDcFZ2+BbNqTzb4ccL1ETDXVGjyzaTUIYNyyLBHKCfVvKfisEa9+4QuK3EnDBjo1KEyJP4aqpZCq9O5vrtB0iM7PbffqNEGQfxHuD+p554clczcvZR0fF2G5d0KLJsAvUJS/Nyj+mw3I7gkdliCqFOqFInY1NqsnGlJuXeYcaBGYWPhuGhBB1C+iTKrNzAec+EpbGWAK7L1GRjgB4Y8e0gPIuYcRu7XDsV1rNjhbyKzraX5gZfU6cmtxOwmexmR/wBoyzkHz8Irx/ERyKyK4eazhfBeVtFnJar1CBEn5+JHnXxg2BfkhtAcdCXBxv5KzhAWrKyszOzMOTk4ESPHjODIcOG0uc9x2AA1JWksmPhicIcCLJs4iMw6ayJ7YlmG5SK0EBoJDplwPcizfQnqEHnHDh4XOPsxJODifOKdjYRpUaz4MiwB07GYdbuB0hg+evkr0MOeGzwqUGRhysfBMepxWtAdHm5yI57z30Nh8FcLjfHWE8t8NzmLsa1yWpNJkWc0aYjv5WjsB3J6Aaqx3HHi7Zb0mpRJPBGX9UrUvDeWiZmIzZcRAOrW2Jt6oO/Y+8LnhrxXIRIOHJKp4ZnLe5MSkyYjQfNj7iysI4l/D7zf4f4UfElPY3FOFIWrp+SYfay4/wCuh7gf0hceivdyr8VbJfGlXlaHjKhVLCkSaeIbZqM5sWWY47c7hq0edlehDiUnEdJZGhulqhTahBDmkWiQo8J40PYggoPmuRXpeI7wjyOSGLoOZeAZB0HCWJYrhGlmM9ynzhuSwdmO3A6G4VlqAiKpzHta17mODXi7SRYEeSClFNiNxZQgIiICIiAiIgIvasgeEbOTiOl5mpZfUqTNMko/0eYnZuZbDhsiWB5bfWJsR0XdeJjgTxpwyZe0vHOJcTyVUNQnfoUaBJwnckuS0lpLzvexGyC2Be48NXCJmZxPT00MHRqfJUqnRWw5+fm4w/Eki4Ahj3nEjbS3mvDld74ZudcPLDPqDhOpxyyl41Y2mm7rNbNX/En4k8vxQXwZD+GhkflW2HU8Zy38NK01wf7WeZaWhns2FsR63V18eYw9hCjGLMRpCj0uRh/We5kCBBYB8A0ALkXX5TymxtoVgs40sz+IOrZuYhwDm/i2ZjMo02+FLyUqTBkzBJux7YY35m2NzcoL1OLzxFcjIuC67lbgiQZjmYq0rFkpiKAWyMHmBHMHnV5B1HL23WKMHmue5uu+5XZAZw5zRXty5wJU6tBhBxiTTYRZLsIFyDEd7t/IG66NNSsxITcaRm4ToUeXiOhRYbhYte02II9UFFx3V7fh68aMXJ/EUvlPmLU3nB1XjckpMxHFwpsw7YntDcbA9r37qyFSCRqN+6D6WYEeFMwWTECI2JDiND2PabhwOxB7LGT4mmP+KPBONqfFp9anKLgJxBpk1SIroXPHA95sd7debsNrLl/Dj43RUG0/IDNOo2mWgQaBUoz9IgG0vEJ+1+Seuyv6zMy1whm1gyo4FxvSoU/S6lCMN7HtHMx3R7D9lwOoKDDllf4kHEtl1GhwqjiSFiqRaOV0vVmc7reUQWcCrrcJeLxgGcoM47GOX9Up9Zgyz3yzJVzY0CPGDTysLiQW3Nhe1grEuK3h3nuGrNSawPGq0CoSEdv0qnx2vBifR3H3REaNWuG3nuvGebW1kHp+fnEPmNxEYujYlxxV4z5dr3fQac15+jykMnRrG7Xta53K8v5VUNV61w08OmLeJPMWWwbh2G6DIQS2NVagW3ZKS99T5uOzR1KD2Tw9uEd+emOmY9xnT3nBeHIwiOa4e7PzQ1ZC82g2LvgOqyJcY/Eph/hqylmoknMwG4mqsB0nQKe3fntYxSBsyGNb9TYdV3SWl8rOE3JVkN8aXouGcLSXvvcQ18d//jiPd03JKwocTGfVb4hc06njqpxY0OSLzBpko51xLSzT7rQNgTufNB5tPztWxJWY9QnYsWdqNSmDEiPN3PixXnX1JJWSrg9yC/ilwUK3XYIGI68xsWauLOl4X2YQP3nzVvvBHw7TWKKzBzaxXJWo1NefwZBiNv8ASZgH69vyW/efRZEJGXh6aWI2QchTJdwLXe8Qeq7NIQCAwdL/ALFxdPgGwaWWt8iF2WQgNDBsBpqBdBvpOEdNb+XdcvLNAaBZbSXhjkAGlz2XJQWjsBprcdFO4NeE3rp+1a7QCbH0VDBb3brVZaxJO6bokA21OvZVX1B+KjoASFULjQi3l5KhfzUH3tC6/wCxBsVBGm1lN/gnSwA1Ud1J1Nr7BNlRSCeg16opFgL3RBLrAgEXv3KqAB01N9UF+bUXFu26gmwGhQSDqSbaKdbh17qkHpraylm5113QVXLbi9+/mnKQCbi3knLvYeqjXt8CgkX11UjS53VI1FtPW6kXtcC/7UE25f1KQ2xJvsqW2JNh8VVckHTTqUE3aDtYHopIO1737dEIvbpYIXNcLubtrqgg72JJ7W6qkuN7G5VR0aRohbYXv5IOPq9Iptfpk5RazJwpuRnoToExAit5mRIbhZzSPMFYUuNzhXmuG/MP6RQ4MaLg6vviRqVHIJEFwN3S7j3bcW7hZuHXOgHoukZwZTYOzrwLUMBY2pjJqRnWXa8/XgRR9WKw9HA/PZBhn4QeKDEXDRmNDqsGM+PhqrFkvWpA6tfDvpFaOj2a2PYkdVmJx/gfLfipyYfRp6JCqNBxFKsmpKah2LoL7XhxWHo5pP6wsJHEHkXijh8zIn8CYjgxHQmOMWnzhYQyblyfde09ex7EFe5cCvGjV8h8Ry2AsaVGJMYDqkblc2IbmmxXEfjWE7M/Kb8UHhnEfw+Y04b8xJjBOKoDokvFBj0yfa38XOy97B7T3GxHQ+oXlzXEhZ88/wDITLjiryzh0iqulo5iw/pVGrEtZzpd7m+69jhu06XGxWEjO/JPG2QOP5/AGN5B8GPLOLpaZA/FTcAn3YsM7EH7jog2eXGbOY2UlYFey6xdUKHOG3OZaKQyKB0ez6rh5EFXYYW8WXP+jyMOUxDQMO1qJDYG+3dBdBe893Bptf0AVjwcT1U69Sg9H4gs88VcROZM1mRi2DAl5mPAhSsGWl7+zgQYY0a2+u5cfVxXnCIg5PDNIfiDEdLoMM2dUZyDKg9ud4b+1fRRlzhWQwPgOgYRpkFsKWpNPgSsNrdrNYAvnny5qcvRcfYdrEy8NgyVUlY8Rx6NbFaSfkvovo85AqNJkp+VeHwZmXhxYbh1a5oIKDE34reeNWxNm3L5MSEw+FRsKy0KYmoYJAjzsZvPd3cNYWW83FWKE91dj4neB6vhfiprOIJ6XiCSxTJyk/JRre48MhNgvaD3a6HqP6Q7q007IHMNyVk28KbiNr9Vi1DIDFc/EnZaSljP0KNGfzPgwwbRJe5+yLhzR018ljHV5PhX0KoVLiZZVJWE8y9LpEzEmHgaNDrNbf1KDJTxl5dS2ZvDjjSgRITXzECnxJ6VJGojQRztt8rfFYDdftb9V9Fec1UlqLlNi+rThaIErRpuI8u2sITl860R4iRHPGziSPiUFJBIsFnZ4acj8CRuF7LrC2NsF0ir8tBlpiMyek2RSIkZvtX/AFhf6zysHWF6Ya1iWlUdouZ2cgwLfnPA/avo1wrT2UnDVKpcJgYyUkoMBrQLWDWAW+5B4JjLw9uFLGTIntcs5elRog/lqXGfLFvmGtPL9yt9x94QWCpmXjRstsxqnIx7EwoFTY2NDv0Bc0A2XP57eJu3JbPLE2V4y+ZWabQI0CX+lw5r2cR0R0CG+ICLEaOeW/Be48MfGlldxOMmabh4TFJxDJQ/ax6VO2ERzOr4ZBs9o69R1CDDXnpw+5m8PGKRhjMahPlvbAvlJ2Fd8tNMHWG/YnuNx1C83WfvixyWoWeGSmIcMVOnQ487LSkSdpkXl9+DMw2lzS09L2sfVYB40F8vGiS8QWfCcWOHYg2KCYAhGYhNjlwhOiNEQt3DSRe3wWTzM7wlMIxsEio5NYzqT64yD7aHCqsRj4M3cXDQ5rRyX6HULF//AOa+hXhsxG7FuQOX2IIkT2kSaw7Ie0de93tgta77wUGAfG+B8V5cYmncH41ok1SatT4hhx5aYYWuBHUd2ncEaFcEvoEz+4Y8qeIqgupmO6DCM/CYWydUgtDZqWJ/JfuR/ROixBcU/BZmXwzVT6ZOwXVrCk08iUrMtDPK030ZGH2HW+B6FBdL4PeMmiJjnAkWKBcQKjCaXb7sdYfJXd8cGXUHMvhjxvRvo4izUlIOqkppctiy/wCMFvUNI+Kxf+GvjQYS4pqDLRplsKDXYEemv5jYOc5t2D15mgD1WaurU+WrNKnKTNsD4E7AiS8VpFwWvaWkfIoPmtBBFx1W4kJ+cpc7L1KnTMSWm5WKyPAjQ3cr4cRpu1zSNiCAQubzJww7A+YGI8IFpaKPU5mTaHCxDWRCG/dZda5j5IPoB4Uc7JTPzJDD2PGxG/hF0ASlUhjeHNwxyxPmRzDyIXC5v8F2SmeGZdKzMx/SI03NU6B7CJKMickGcAPuGNbV3L2urDfCoz6GEcyJzJmtT7IVOxSHRqe2I6wE6wX5Rfq5oPqQstEb2hgvEG3tC08l9r20ug4imUjCmAcPsp9JkadQqLTYJIZDa2BAgQ2jUnYAeZWDjjeGTsbPyu1nJnFMGs02qRXTU77Bv4iBNk/jGw37PaTrcXGq5HjCz44kcSZiYiy0zUxTOS0rSJ+JCFJlSYEs5gd7ji1v1wW2IJuul5B8LWcHEVWmSGBsNxRT2PDZqrTTTDlJcdbvI94/0W3KDyXdFd9xZ+H7iDhvy9o+OqTWZjEUq0+xrkVkDlZKxHH3HgDUMP1bnrburQUGtKTkzITUKckpiJBmID2xYUWG7lcx4NwQehBV+9F8VzG9IySgYZfh6FN48l2/Q2VWLrAMENs2M5t9YnlsTqrAkQc3i7GOJcf4hncWYwrExVKtUYpjTM1HfzOe4/qHYDQLhTul9Dqu0ZZ5aYwzbxnTcCYIo8eoVOpRRDa2EwlsJv2ojz9ljRqSdAg3+TeUeL878f03LzBckY89Puu+IfqS8EfXivPRoH7B1WbbIDIfLbhIysjyUtMy8EQYJna5WpktYYzmtu573H6rG62GwWw4W+F3AfC1gZ0OAJaPXZmAIlZrMUAF3KLlocfqwxrp5XKsF8QTjfiZs1KayhyvqrxhCRjctQnIL7CpxWn6oPWECPQnVB0Tjl4wp7iPxd/B/DUxFg4HokZ30KCdPpkUafSHjrpflHQHzXk3D9khWs7sbQKRKw4kGkSjmxanOW92FDv9QHq91rAep6LqWX2AsSZlYsksIYWkXzM5OPALg33IMO/vRHno0DX7llcySyhoWTuDpTC1FhsMQARJyY5LPmI1tXE9ug8kHa8K4YpeGKFI0GiSbJeSkYLYEFjW2AaB+vRdqp0EEg8p07LQlJa77Fthfm23XYJGVtyva0HzQb6RlrWcWm99Sei5+Uhco2texA7rZyUueVpI89lzMtCuGgnZS3BuocN2gBvfyW8gM2I0vqtGDDY3axW7gt+za37U6Grp1VdiOmipIAOpVZJtcWSiBcm9tlUbb6AKOtyBqpPMbm3wVA6aduqgga3t5aoDpfum5QQLHr5odyQdkIF7C4NtVI3Nygjmv2+9EcRpbf0RBqA66fBUk23CaAgkC3VSHH77oHvam1/JTZQ3RL3/AFoKgdSdrjsp1Ot7hUiwNwBdTfzQTo4ix+aAX62tqm2wPwRwIGtvggakjra5P/FSB57/ACUA6aHdSL3DjqUFRuRvcdEbzAW2HZQ0usbGyEh17X+SkElx1bcHroh1aBY6aoNQG66bpc3u0anzVFLmnlFuhutB4IJA6dFrnmJ0vtqtJwtf06oPH+JPh2wfxGZfzWFsQykKHUoLHxKVUQ38bKR7aEHflOxCwk5rZVY0yYxnO4GxzSoknPSjzyPLTyR4d9IjHbOae4X0Im1r2+9eIcVHDPhPiSwG+hVKFClK5JB0WkVMQx7SXiW1aTuWOsLj07IMfnAxxyT+SNUgZd5kVCPN4HnonLCjPJe+lxDoHN6+zPUdNwsj+dmRuU/FlltCkqm6UnoExB+kUesyjg6JAc4Xa9jxu3a7eqwi5s5RY6yVxfM4Lx9R4kjOwfehPsTCmIV9IkN2zmn7tirgeDDjor3DxOswdjJsxV8ETUUEwg68WnuJ1iQr7t7t+SDxDiA4dcxuHPGcbC2N6XE+jPcXSFRhtJl5yFfRzXbX7t3C8wue6+grEOHcm+LLKZsvNiRxHhuswfaS8zDIL4D7aOad2PaenwKxH8VnApmbw4zcevyUB+IMFviH2NUloZLpYE6NjsGrfztigtnRRzdipQVNcWm4Nj0Wa7w8eJCjZz5M0/CU/P2xZhCAyRn5eI7340AaQo7OrmloAPZwPksJ671kznFi/I3H1PzAwXNeynZJ1okNxPJMQj9aG8dQQgzYcWvC3hvigwAMPz8dshWqcXxqTUOW5gxSNWu6lhsLhYfM0OD7iIylrEek4iy2q05BhuIhT9Ml3TUtHb0c17AbehAIWWPht47cm8/6fLU+JV4GHMUlto1JqEZsMvf1MJ50eD238lckDDitDmlr2nUEahBgOyv4N+IrNipwpGgZaVaTl3uAiT1SgOlZeEOpLngX9ACVl84SeFXC/C/gU0eSiMqGIanyxqvUi2xivA0hs7Q262HmSvdbshj7LQPgAvAeIrjUya4fKXMQqjX5Ws4jDD9Ho0hGbEjF/T2hFxDHrr5IPMvE/wA7pHL7I9+XknO8tbxk76O2Ew+82VabxHHsDt5rDcvQc9M7MaZ+5hT+YONZ0xI8yfZy0s0/ipSACeSFDHQC/wASSV58g9b4TcL/AMMeIzANBdD54cSsQY0QWv7kM85/3Vn/ALiGw22a3QLCp4ZFAdW+KyizPsedlLp83OOP5Puho+9yzW2sg+e7iSmqpVc+MfVypSczBdP4jqEVhjQnM5me3cGkXGo5QFcR4YGUeO6/nzI5kSdOmpbDtAgRvpU69pZDjOe0tbCaftG5ue1llsrmAcEYlbyYgwlSKiCb/wCcycOJr6kLWcMKYFobornUug0iSZd7nFktLwWjqSbNAQTjGtSOHMKViv1OI2HKU+RjTEZxOgY1hJXzh1qZZO1mfnYYsyYmYsVvo5xI/Wsl/H5x84HrOCahkzkzXG1iYqv4iq1aWN5eFBB96HDd9su2JGluqxiE3NygqB6rNx4a2MBirhSw1Kuic8ShRpmlu1uQGRC5v3OCwjjZZVPCAxXDmsAYywc5/wCMkKjDnGt7NiMsT82oL8cR4xwvhF0g3E1clKb+FJkScoZmIGNjRyCQwE6XIB0W5rlComKKTMUSv02WqNPnIZhxpeOwPhxGHoQdCrbPEkw3+HuFbEU7Ca4TNGmJWoQIjdHQy2IASD00JVn3CD4lVcy/hymAM9I8zWKCzlhStYHvzMm3a0TrEYNNdwg9C4gPDxr2W2O6ZnjwxSj4wo1RhVWNh9r/AMZDMN4efo9/rDQ+5v2usjFNmnT8hLTzoL4X0iCyL7N4s5vML2I6EXXGYLxxhLMPDspizBVfk6vSp5nPBmZaIHtI7HqCOoOoXOoMJPiVZcMwDxOVioSsD2cpiaBDqkOwsDEcLRLf1gVarp1KyjeL/lmZ3DWD81pZo5qbMxKVNWGpZEHMwnyBaR8Vi5Qb+h1up4brMjiGiTb5WoU2YhzUrHYbOhxWODmuHoQF9BXDzm5T88MoMN5jSTmCNUpNhnITDf2My0Wis+DgfgvnnbbqVkD8KviJp+EMSVfJnFdXhykhWGOqFNizEUMhQ48Nt4jLu0bdoJ+CC+XMXgyyTzWzclM38bUR9QqErLtgOk3OtLRy0+6+I37RGy9dAwhl7h616ZQKLT4fXkl4EFgHwAVpmffidZMZZw5mj5duONa5DLoYMs7lk4bh1dF+0L/k39VjOz14rM5eISffFxziWK2miIXwKVKEw5WEOnuj63qboL9eLLxMMsZKkVPLjKqjSWNos5DfKT03OQ704MNw4NB/lfUaeaxWxontor4vI1nO4u5WiwFzsPJafL5qUBEOl/Je/wDC9wa5lcTNWbHpsu+kYYl4lpuszEM8nm2EPtu9NB1Qee5L5G5j59YvgYQy6oUSdjxHAx5h3uy8rD6viPOjQB03PQLNTwz8MeXvCzgT6PJiWiVZ8v7Ws1uOA10QgXcOY/Vhgi4HkuZyxyqyh4Tsr4kpSIknR6RTYP0ip1Wee1j45A1iRHncnoPQBY1ONPj+xBnRMzmXmV85MUnBLC6DHjMJZGqYvu7q2Hp9Xr1Qdo49ePl+YL5zJ7JupxIWHYTzCqlVgksdPOBsYcMj/Rdz9r0VjeEcJYix5iCVwxhanRZ2ozrw2Gxg0Hdzj0A3JKrwhg7EWPcRSmFsLU6JOVCdeGMYwaNHVzj0aNyVkw4buG+i5JYfdGjuZPYhn2gzk6GaNFv5JnUNF/ig3fDpkDRcksLQ5VrIc1XZ1rXVCdDbkv3MNp/IBXt8nLvc7kcN97ancbqiVln8rbN+A2XNSMm/fk1HfZBuZCXDy3TQeS5+Qk3M97lsLaei0JOVOmhuey5uVlnWHMDYa3spo15OBytA5fVcpAZYXA0236LQgQrggjT9q38Mcrb2Nh0spRrQm2vrcLVDewVENuxA8z6rWAv6LQqAB2Sw03KAANuN1NhsDbugBoBuDpZVAja+qjce6Oyi48vigEG+p16pynfZTbRRYX0QSBpYi6ovbZVW6g6IHEbeqgkkNKKAR9ofeioq30J03UAjUXGndSB9nS1rhRrbRBJuRcDQbqoWubnS3zVJDgfMlRfW/QJoq1Ot91J3tcKBbobqeYg6oFwDe+qA331UctxoL3RpAvsgq3ve/wAuqN11v01snNEHU66lQC4uuTfsgqAu6/61JAuSDf4bKkE7o0m12kd90Go0tBva1lJN+lj67KgWtcm462Um4sL9SgptuO6hwAJduAqh116KH8oFgdTog28Ruq0nAfa9FuT1Pbr2Wi9tydd+pQeP8RPDjgHiJwi7DmLpP2U7L3fTqlCaPbysS1tD1aerdisOXEJw7474dsYvw1iyUMWTjkvp9ShMPsJuH/Rd0cOrdws87z0uADoun5m5U4FzcwvGwljzD8tVJGKC5oiMHPCfawex27XC+4QYXuG7iszN4bMQiewtUXzdFmXt+n0eYeTLxhfVwH2H/wBIfG6zAZE8RuUXFXguOKNGlo0yYPs6tQZ4NMaCCLHmYfrsPRwuPisW3FjwO45yBm4+KcNS0xXsExX3bOQm80WSvsyO0agdn/V8wVb9gXMHF+W2I5bFmB67NUmqSbrwpiXeWm3Vp7g9QdEGQrit8LuFMOncc8O1ocZxfMTGHoz7Mcd/83cdvzT8FjbrlDreGKrM0LEVKmqbUZOIYUxKzUIw4sJ43DmnULKzwmeJZhzMCJLYFzxiylBrsTlhStWJ5JObdtaITpDce50N+i9/z84SMlOJOmmdxHSYEGrRIIErW5DlEcC3u3cNHt8jdBgZ5vJSri+JTgYzi4eZyYqcSlRsQYTD/wATWZGGXthtJ0Edg1hnzOh6FW6kEGxFkFUKLFgxGxYMR0N7Tdrmkgg+RC9LwlxOcQGBoDZTDGbWI5SXYLNgGcdEhtHk11wF5iiD1bE/FTxFYylXyeIc4MSR5d4s+FDnHQmOHYhll5bHjx5mM+PMxokaK88znvcXOce5JWmiAiIgyGeD5g9k5j7HGOIg1ptOgSEI+cV5c77mBXtccGMahgbhnxjXKTPxpKdEs2DAjwYhZEY97gAWuGoPmrFvDZ4nciMh8LYkoeZmJotHqtaqTI0OK6TixIPsWwwBd7Gm2vNuvW/EZ4j8pMwOGllJy2zHoGII1VqsuHwZCfhxI0OG0FxL4YPO0bbgIPEeALjCx5TM6pPBuamYVWq9FxK0SMA1KadGbAmSfxZBcfdudPiFlIzWy6oebOXldy9xFCL5GtScSWeQbOY4j3Xg9CDYr51JKcmpCbgz0nHfBmJd7YsKIw2cx4NwQe91nV4IeIKHxA5IUus1OehxcR0hop1ZYD7xjMFmxSP6bbO9SUGEHMHBNWy3xxXMCVyC+FO0OeiyUVrm2J5HEB3oRY/FdfG6yM+LLw/imVymZ+UGVtAqfLTqyGN0EZo/FRT6gcp9Ascw3QV2ur3vCcxhFomftTwu6KRBr9IeOW9rxIR5h9xKshG69v4KsZOwNxQ5f1Yv5YUzVYdOi62HLH/F6+XvIM0XEvhc4zyDx5hxrQ581Q5osFt3MYXj72r58XNLXFrhYtJBHYr6SarN0eJJTEnUZ6Vhwo8J0J4ixWtBa4WN7nzXzt5o0EYUzKxThlpaRSqxNygINwQyK4AgjcaIO+cPHFPmpw3Vsz+CamI9NjuBm6VNEulo472+y7zCy/8ADDxg5acS9F/9CzcOl4klmAztFmIo9s09XQ/5xnmNuqwOXK5HDmI69hKtyeI8M1aaplTkIgiy01LRCyJDcOoIQZxuPjAMTMHhbxlIS0PnmaZLtqsAWuSYDg4j9G6wSq6HGXiKcSeM8BNwFPYilIECLLulZ2cgS4ExNwyLEPdsLg2Nt1bARc3QUqWuex3Oxxa4dQbFBpupuEBQTZRcqpBHMtaTlJqozUGRkJaLMTMw8QoUGEwufEeTYNaBqSSvdeHHguzj4jp6HM0GlGkYbZFDZmtz7HMght/eEIWvFd5N07kLKvw58EOTPDtAl6pI0qFWcSwW+9WZ6GHRGOIsTDB0YPTVBaBwreF/Ua4JDHXEC+JJST2tmIOH4R5Y0QbgR3fZB/JGvdX75iZlZRcLeWzarXoslQqLT4QgSEhKsDXzDwPdhwoY+s49T03JXinFh4guX2RUGZwngmNL4mxpqx0GC/mlpE94rxoXD8ga97LE/m3nZmPnhiN+JsxcRzNSmAXCBCc4iDLtJvyw2bNCD1Liy4zcc8TFZMlzRaPhGTiEydKhxDaJY6PjW0e77gvF8vsvcUZm4nlcK4Tp0Sam5h3vuDTyQIfWI87NaO59N12/Izh8xtnhXGy1HljJ0eA8CdqkZp9lCb+S38t57D42WSfKLJfBmTeH20XDNNDIz2t+lTjwDFmH93O7a6DYIOs8P3DrhbJGj8spDbOVubYBPVB7RzE/kM6tbc/Fe0wYDS4m3Nr0cq5aTLnc1rjZcvJyQB91tiDe53ulESUrzAHl3Flz8lKB1ifhcWVErJEAWF9d7rm5OU90bLImVlWjXXQALloDNhe463VEvLtNuYfILfQoVtGtA6K9iqHDGgA27LeshnlsdFRChkXBsB1WuxrdeUWHYDdOwAHQ6LUa0jsbKnk3KqHNr1AQVA9Bv2Qe87mF9B9yi2uupPRBrsLBUVO5iADceSp011GikXHW6Ha5ve6AHtBsd+yEE6NN7eSgjoOnRQDpe+oUoaHS2qki23qg5iLi5BS5sDayBpY3uUQu7EfFFRU25vbXTvZNTa3XdQd1JNzcKaIvf3Rf5KbuaL9UJtcjqgsBra4SXQJ7mx6p09VPua3GnQqBc9FQ07EFVXtoDp0KjcHsoBtvbvqgqBF7EaqQCL6qLm9xb/ghJv1A3sgnupsLkg3UWcdQd0bt2QTfTT7kDu6A3J131UtJ+tcXCATY2DgDZSAftG3oqb36DsqidCboKHaHS1ui0jrcAXF1q2HQ3UOaQdUG3I3BC0SyxAaGn1W8cw33BtZaLmgX+Ce4OLn5KTqMnGkZ+WhzEvGaWRYUVgc17TuCDoVYLxWeG7Sa9Bmsb5CwGSNVHPGmaG91oMx1/Ek/Udv7p0Pksgz4ZJ0PcrRezUhzVOh88GJsL4kwXWY+H8V0WcpNSlnWiS01CMN7fOx3HmF75w48dmb3D9FlqSJ52IcMQ3j2lLnYhPIzr7J51YfuWUTPnhpyw4gKI+nY0pDGT8NpErU5dobMy56Wd9oeRWL7iA4C83sl3zVao8m/FGGYbyWTskwmNCZ/1sIaj1FwqMpORvF5kVxHUeHKUavykvVpiGWTNBqfKyODbVoa73Yg823XmnEL4bOTubUKbrWBmQ8H4jikvESWZeViv/pwhtfuFh0kZ+oUefhz1Om48lOSz+aHFhPLIkNw6gjUFXk8Pvic5r5ZMlqBmVL/AMMqJDsz2sR/JOwmeT9n2/pfNB43nbwZ59ZEzswcTYPmJ+kw/eZV6Y0zEq9vckC7PMOAXh5BBIIsRuFngya4x+H7iAlTTqFimWlqhEbaLSKuGwYzr9AHe7E+BK6jnj4eeQedHtKrI0s4VrUUEicpTWtZEJ6vhfVPwsgwmIrxc1vC94g8C/S53B7JHGNOg3fD+hv9lMlnnCfufIEq07EeEMVYQnH0/FWG6nSJmG4tdDnZV8E3H5wF0HFooB7qUAkg2Cpubqoi4soDUDmK7hgDNzMvKyLMxsvcZ1SgvnABHMnGLBEttcdV1C90Qep4v4oc+sfYcmsJYyzJqlXpE4G+2lppwe11jcdO68sREBastNTMnMwpyUjxIEeA8RIUWG4tcx4Nw4EbEd1pIg5yo46xpWHF1VxZWJwu39vOxH3+ZXCOc57i57i5xNySbkqEQERCLoBcCo5ioIst9RKBX8Szjadhyiz1UmnmzYEnLvjPcfJrQSg2JN0V2eU3hn8RuZEKWqFfp0pg+mxyHGJVH/jwzuITbm/kbK+rJLw0ci8rIkGrYngRsZVeFZzYtRAbLscOrYQ037koMXOTnC7nbnlPwJfAmCJyLJxXWdU5ppgScMdXGI7Q+guVkk4c/DGy0y1+j4gzWjwsYV6GREEBzOWRgOHZp1fbufkrjsyM7Mk+HzDvPjDElJoctLM5YFPl+X2zuzYcFmv3W81YPn/4rVerUGaw9kVQX0aXeDD/AAxPWdMEH7UOGNG+pJKC/fM7PTJXh2w8IuNsS02iQJeFeWpsu0OjxQNmw4LNT22t5rGLxM+JNmXm3EnMM5amYwlheK0wrsdacmWG4PO8fUBHQfNWl4pxfifG1YjV/FlcnKrUJgl0SYmopiPPxOw8l3vKThuzQzgjNjYfoj5al8wD6lNgw4DR/Rvq8+iDzVom6jNBrRGmZmO/QAF74jj95JV1nDvwSYhxVGg4qzWkotMo49+DTnO5ZiZ7Fw+w3X1KuWyR4RsvsnocOqRoArdesCZ2ZYCIbv8Aq26huvXde8QJQc1i4XJtayDh8O4XoWFKRLULDlKlqfJSzQyHAgNs0ADr39V2CFJkaAD3tvLzW4gSJ3Gh6XubrlpWSIcAeo7INrJybri7QL7lc5JSbi656FaspJtA5SdjouWl5UNv7ouNbIKJaWaQLNI7rkoEAsAAb6qIECw1N77aLkWQddSL+SzRRChe8De56BbxkIgjS19wkOGHHZawGlgbWFloSA4m9hp5rUAOvn96oA7npstQAkalBVYE6C3nZDfyPoo72UkW3N1KAB63S4vY9kJdve4UEaaHXqqJN+W2gv8AJL310+Kixt5H9aa39EC+uo9U2S+ux7p1QSNQov5f+SAqCb6eSgORSSGm51uiokNJOgvbsh06gAIL+qAG9yNAp7ge70cp63va6gnUAHRA3SwbcJJgnfslyT0UXuDc69FPkL6eSoC3fdSBYfelgCetr281IPujzQU8pGhHqp1I1Km9txZRqbkfrQS7mtfXTcdkG3Np8E6anfVNLeqCQSBf/mykCzSe+ygN0Bulxvc/JAG9lUOurWjoo1PXT9qEdSR6BBJOgJPofNUl17gk3spDjrYXv0U8oI7G9yg0yb310H3rTfy3P3ei1Tca3Fu1lQ5vMdDug0SOlxotCIw3Jvdbst1t5rScwXN9e6lHHxG9B0Wzjy0N7OWNDa8OFiCAQ4ehXKxIfNoNbfcttFYPq6aDslFqme/AHkxm6+brlKkv4L4gj3eZyQaGwoj+74Wxv5WWPLPXgvznyNfHqNRoxrWH4Ru2q05pexre8Rn1ofqRbzWa6JDYdCLraTMrBmIT4EeCyJCe0h7XtDmuB6EHcIPnogTEeVitjy8eJBiNN2vY4tcD5EK5XJjxB+IXKCFK0t9fZiWjS1miTqwMRwZ2bE+sNPVX8Zw8C2RWa7nz7aA3D1SdcmbpbRC5j3cz6p+Ssfzg8OXOrAImapghsDGdKh3e0SjhDm2s7mC4jmP5hcfJUXkZR+KdkjjR8GnZhyE9g6ffZvtnsMeULvz2e834t+KuWDcjeIDDDokI4VxtR5jdzHQZpoPY2uWu30OoWACtYer+HJl0liChz9NmGGzoU5LPguB9HAFauG8YYpwfPCpYUxFUaRMt2iScw+E7/CQgy7ZkeF3w540ZFj4XhVLCc483a6RjF8G/nDfcfC6tqx74RWZ1MhRZrL7HlIrXLcsgTzHSsRw7BwDm3+S8py68RriawHBbKTWKoWIpZlrMqsIRHWHTnFnK5XL7xe6O+DBlsysr5qFGGkSZpEw17T5+ziWt+kgsvxpwZcTmA/aureT9fjwoN+aNT4H0xlh1vBLjb1C8cm5GekI75Wfko8tHhmzocaGWOaexBsQs4WXviEcKuYb4cpCzHhUOciAXl63LxJQD/tXD2X+NelxJjIPM2HzRY+B8SQ3DRwiSsyCPgSg+eoEDcqVnur3B/wAL+KgXz2UeGiImvPLS4hE/Fll53VfDP4Vqg98WHhKdkiTtLz0RoHzugwrAXULMVNeFRw3x3n6PHxFAHQCdvb5hbT/JO8Pf/TOJP70P3IMQCLMDD8KDh5YbvquI3+Rmx+5ctIeFrwySzw6Ykq3NBvR8+Rf5BBhoVcODGiuDIcJ73ONg1rSST2ss6GHuAbhVww6HEgZXyE09modOvdGJ/SNl6NSsvcjsuW+3peF8JUL2Y/lRAgQSB6myDBzgvhb4hswWQo+FMosRzMvG+pMRpQy0Fw7h8XlafgVcXl34UOemJIUKaxvXqHhiG+3NB9qZmO0eYYOUfpFZG8b8WfDblvKviYlzcw7B9mCPo8lMfS41+3soAe77lbjjnxa8lqMIsLAeDa/iGIw2ZFjtbJwXHv7132/qoNzlx4UGR+GnQprHdarGKZlmrmF/0eXP9Vup+aumwdlfk5kpQnQ8LYZw/hinSzOaJMckOFZo3c+I7X4krFtj/wAU/iCxO2PLYXlaRhmXi3DDLwjFisH5ztL+dlbHjjOjNXMqM+LjrH1arAe7mMOYmnmGD5Mvyj5IMveb/iO8OOWDIsnRsQPxjVG3AgUe0SCCO8c+5b83mVk+b/ikZ3Y39tTsASsnhCnPBbzwR7aaN+vtHaN+AVl8tLzM5FECTl4seI46MhtLnH0AXtmWHB3nRmUIc4+ifwfpkQ2E3Vbwi4d2Q/ru9bAeaDyDEGJq/iqpxqziWszlTnplxfFmJqM6I9zj1JK7PlfkpmNnBP8A0PBOH40xAY8NjTsQckvBv3edz5C5V92WXAhlThEy9QxI6LiadhAE/SW8sAv8oY3HqrjaNQaVQ5OHIUiSgSctBaAyFAhhjW+QAAQWsZQ8BOCMKeyq2Ys0cRVBlniXDS2Vae3Lu/4/JXWU2lyNNloclTJOFLS8ICHDhQmBrGDYAAbLfslnkhpI3tYdVyECTYbhoIt5dUGzgyziTcOHnbdb+FKEloPwtrqt9LSGlwLLkZeTc73COm/dSXRs5eTt7rQ0ADtZcpJymmovpe9t1ry0oGgc1tOq5GBLtAFwdRfVLyNKXlhyg8ps3TVcjCggN0ve2t91MKAN7/8Amt3Lwm21BPQ9FKIgQwG6m63LIbvq/eVLW9lrMh2FnfBWCWgkfWGn3qsC3UahBbrf5qos03QRYAWJuEGnYqRueb5HS6loHKdd1fMEl1wW/BQLk6Ieqkglu+yCNjbohDjqRqpsAeYaaXVNxa5Fvggk81i0BSB3APmh0bzEqBcm26BpsNDa50UaXsNCp0sTcaKkb6nVBUbWFv8AkqAdyltLXuoI0sNB1UzBPMPJEba1z1RNFVjqbj0UXNk0ve4Cgam3dUVke9Zx0ChvW+29wFDrjU9VIIDbnVAvf9pUi1zrruqR2+FkIGvfoVIKj6gaJzC3KguNLqOtgU6FVhfTdVEW7G/ZUHRumpS+pVEk7m90vre9wEBHdRdpGiBrproqhcg6fHsgGt1I0O+g6oFx6qWgE8xsDv6BUgaE/qQeevkgqtc817KQ67bW1vf1WmTrbsbqrpZBLhe3zVFrm3fVVbHVxv3UbAhBpvG5aD8FSW6b69itXQ7i6oIGxUvY0Cyxvc6+Wy0ntNydNdtVuwN/RUOaBuL/AASTBx0RgJsAtCJA3INtVyT4QIIaOmhW2dDcNCb32UHGRIVhYBbd0Ftg0i/dco+ACbg621WhEgAac2/ZJcHSsYZd4JxvJOkMXYXptVgvFuWZl2vI9Da4+BVteZPhyZG4whvj4XZO4VnL355R/tITvWG79hCvCfC05bX5u5W0jQPZ6Xtor/qjFTmH4aWc+G3vmMC1ekYplb+7D9r9FmLfmxPcPwcvBsXcOueOBAX4myxrsrDbe8WHLGMz9KHzBZxYsDn6AX+5aEWUhubyus4bEFJdGAGYlZyUeWTcrGgOG7YsMtI+BCmWqE7KPESTnY8B4+1CiFpHxCzp1zK7L7E0OIyvYLo0+1/1hGk2En42XkuKOBjhyxK+JGfgZlPiPN7yUV0ED4A2HyTRi1omd2cGGy00TMvEcry7BtQiED5ld0p/GfxNU0csDN+uOA/nIvP+tXnVrwyMl57nNKxJiSnOIJb+NZFYPgWgn5ro1T8K+R5nOpecEyxp1DY9Ka77xEVHhEn4gPFfJ25M05h9v5yWhO/WFvh4jPFqNDmS3+4Qf3L0qN4XGJWk/Rc2Ke635dPe0/c4rZv8L7G4uW5n0c+spEQeczHiG8WswOX+NB7L9WyUIfsXFTfHVxTzgLYubdSbf+baxn6gvW4fhf4zufa5o0do7iUiFclKeF9UgQajm5BAH1hApZPyu8ILa6vxScQddhuhVLNzEkRjt2tnXNH3LotWxjiqvO563iaqT7j1mZt8T9ZKv3o3hn5fSz2/hvHdbniNSIEJkEH/AHl3ikcA3D5SXB81RalUnM/1mcOvwbZBi65nxX2aS9x6AXK7JhrLLMXGMcQMM4KrFRc7YwZV5b8yLLLdhzIHKDCbAyg5eUWXcB7sR0sHv9STcnZd2laPKyrRDk5SDBa0aNhtDR8gFNGL3CHAfn5iWPDdVqZTsOypIL4s/NBzwPKHD5jfyNlcFgDw6sB0WZgzmOsRT1ecyxdLQmfR4Lj5kEuI+SvI+jbA638lWZZ2rzfTYbXVHneCslctsvmkYTwbTpGJt7UQgYlvzjqu6NlbgWhO93suWZI8zRpqBe5C1YMnygPO41TRxkORe4tJaNel+i3TJMgi7fv0suUbIWa0NvYa6LdQpC7SP+Qpo46HIRC7RtrHTRb+BIEMFwOxHWy5GHJdbDsFvoMoeUWtslo2cGTcA27QLW3W/gy/Q6rcQ5YEXPrcrdsg3IHKLDeylGhDl9Rba+q3cKAbWI+a1IcO29j5rXhQw73QbJaKIcOzrAalbiHD5deYaKYcMtdzaCy1dANTpt6p4KWt+0evZalhsNrKWNJNjoqhoL30V0Rt27qu4NiAqeW9zdTy83UaJgOF/QqNDvr3VXcKBYHY6KWiTa+ovoqbA3166FTYkWA0UC23U91ZdEnm7+Sg7oTZp7KL3G9gVefAuL3upO2hvdQbd/3qQdbH5qbgpdYOsNLJ0v3QncoN73V3A1AAupF7WKjm1s47JcnWyb/BIIRRbW46ooK/JNhcHdNR1QfBUR5A7lHEjUKNulkabuudB5p6JBBv1JG6nZiHY2sEFwSBb4oHzup1JJA3+9Cex18lGuxdc9Qglt7aoQW7keigkn7N9b3TmuQ4boKiRbVTc7KBooPW5A01UgqDh31UkgfFUAAm97eRUnU6m47qioE6m1lAcHFRffTbZVXIFgfNTeQcOU2vsd1JJGhO6gHUknW3VQLEHmNrbX6qirU63tZUnU9lVpqQVSd/NAIJ16WtdRfmGuvl0VVxcm4+ap+PzQU69/gocGjY69lXuAbgKl7d7AkX0uswaZAuTbTutOJDFulytexv0v1uocDbT18ko2bmN22Wi+HYHot69hvoN9Rfa60i0gW3v0UGwfBGlmG3qtCLAu3ktp3AXKezaPM9VpPhj7Jv5oOHfLaWtoOoWgZcWuDf4LmIsAHT5LRdCJ05dkHEmX5BykAjqtB8AatA0tqey5h8PlOwC0YkuHC4AB/atDiHS97b33Wg6DzHUbLmTLFaL5QAm7b26jVZHEGXu48526LQfKuLrFtgVzX0dup5fnqqDLjl5SP+BQcG6AAAA3QCy0/oZc69vdOtrrnDLNaCOUkA2tboqWyuo0Fv2Kjg/oQHTTbdQZM6Ai5HmuwCTaACANd9NVQZQ3vy/BBwX0NoN/ZkdQ47KoSRvzObrZc4JRp3BaPPoqhJ27J0OEbJgaBoJAVbZMOtZum+nRcyJL8kLVZIC5be4B31Cg4iHJgak9NVuWSViG3FrLk2yevNsdDY9dVrslrOFm697bqyaONZIhx94bi23RbqHJ8tr2GvRchDl7dN/JazZcuG2lr7WVg2jJZvNzEeq3DIR3J0vZbkQeVtw3mWqyGLC1yCp2NBsEWAJ9bHZa7IQBuTa61RCIuOW1r79VqMZZpIF77jqpeBQ1t9SLW2WsIehHMO4unIQQQN9CtQAnZawGNIF72uq7Bw1N1AAIsXAITa1xsNSpgnltrfbXVVDo623movrtv1Q2cL3JKvQADqqgDc2t3UfWtp0KkaGxFr7qiAfPyQnVD67lDtcX3t/wAUE3/co6XI1QO00UaW1KzgggX069E9646DdHC/UIbDa3/PVaC4OijlFrqoW+apud1BIbruNVB3Iv0Q37AevVRfyKCdig0OpT6xNipB6b2U0Qb9SiEEaC/oisFRsQQNgo12cosLlTt5q6JPdL+YIPdUqdvMoJ0B97/kpewN+qkdrglU2uRa3yQVDTbUlBc6aW7JoBvsmtx+0IF76WGiEW2tcbKNN7fLuqnWQR01OvVTe/W1vvUdfRTft1QBYAe9uosAfraKR0N1J5TcO7aIBuNCEH9Ei/mpv0vdRYWOoQSAdOw3UgjW6gHsdOqnm1va/kggb/8ABDo7bRSTe7i6+qaAGxv0Ut/ggkGxUG5Nx1UlQA7Ukp2JAuliBdxUW0t36qoWJu7VUUlp3O6EKdymnXQqdjT5dCSbnv5Kkt0317rVIuPW6gC52vZTobd0MuAudfktMwwTYg6+S3RFydR8VSQL6EHRXNG1MIDcH0JWk6EbdCt9y2vfVafJck7X381kbF8G17de603Swdr9y5B8Im+u57LTLQABfUdLKjYOl+lvmtL2JNw0EgrknMb13G6pdDFyGi9z2TBxhgtFxfU9VQ+XItp6XXJGENwNf1qkw+hAOnZMHG+wANiPPa6gSxtblBJ1XJ+xvb3RrqqRBI3tyqjjvo1/goMAl1i29yuU9kGt5eW4QQfds0bd+6dDj/o1ydLX0Olk+jhrruFreWy5EwX35uawU+xfexF0wbH2HKQeXppp0VYlgN9fQLfeyvYEAX7qpkIDQD/yUo2X0bXv69VqMlgL31W79nZ1y23ZRyG4u74d0g0WsHQaqsQ/ILXDGE3vb0FlUWgk2vffU6+qo0SNLXVfs9Q0k7dAtZsPuLqosudClmigtBPvAk+SrsDbTQjVVBpAsbKeX9581RRbXfoq7Em2mqjl0vr8lWSbNN79/RBTfy07qSCCTpbogFyWm6m+n7UEAWUhw6oCN79VAsT+5BIO9yNlBt1Ty3tpdSCL2J0Pkgp32S9j3UuUXdYdUAi9rfBVEkbKNLG43Gijdu6aJGtwD9ygW5d7WCl1w6xH/FRsNNdL+amiq/cqnQb9UbpYWQm4tzKhyi2p26pe/VCRazSguTYG3fupeA1ANhbVQBbW481Ubnf7lS2xJv0UEtIva+6KLhovoituCbfFQNrXuo5jY2Cnm0vbZUS0a7qL2cp3v80JJ3IvsgDz/UpsBc7a2S5Hmo/rDa+6Cot5dAQbpra90BFrGw/UoA1+CgnQCw6ISbWspdYnQC3Q9SoA0tdUNbeSDawAKbA33+5AL76IJt31QnUEWUixvbpumrglEHW6WBsQ7pom+49NVVewJU0ANgDco7QDXTqoOiq16lWikG1+l1ILgTynW2voov2sp0OnTvZZ3gASNb7hCdALeahxIdZAbi/mlE9AD0Ucvr30QEb91Olt1RAF/gVJBG580Hr+1Q11je2yQOnqpGg+CHTW45eidbIIsBfXRRY2NzdVCx+GtlGtrpRSRzdNlHKSO6qN3dbKLaaNUwUWsLX+KocxpPW4N7rWtca63UABpu6/yVsGjykmzSo5Q22u+trarWAuNW2uo5T+9TBtnQnW3FwqXQm8uu4Oq3RZY7/+ags5jqdAro23sQdQN9wOikwgDa4styGAai+tzZLDp0VG2bBB3JIA6IIYOzmjqtwRb1UOBJsD9yUaPswAb/NTy3N777XWtbT0TkNz/wA3WfoaPJcA6u9FU1unNuVrFjdiPknLfdJcGiWbC4t5qQ23XU6rVc0X0N+gVRHXvsoNK1iddxZTbW1xZVizr31TXr8FrQ5bdUAs6+6qA7EJpqBbXv3QLC45kse4VRtvcqnlBPb96QTuVT9U6nzU3F7hAA62ttN/NUQNDo46qrQa2uOigHXQXspDgdigEgakoLAG5sVS4G99Chv0CCdr9bp7pBuLKNeuic1nWdoO6gNJNxcaIeUkkkpcE20I8t1OndUQHAfaF99kA0HdU9PM9VVqOpWbyBBAva4UWG7tUN7EX+KgOd2HwVwT0uHXIUH3juNlFwb+SlpDTa+hVEEG+ynUm26H87fZHEm3YbrOiQ4tB1GvYKL3cdP+KDmINx6aqLNG5smCSLXRSD8kVFJJvuLKdSd90v6aqD7pFjfqgCzdyFLSSNHISTe6DT06KhfWwNwp231HkovfzPmE1JspcEi1teqm4HZQA217i11Nwb36KhfXyS+l+nZRfXVNLbX9UE2N7n5KbtJuRZLnvr6XUC3XqbIKrAHyPdNwBa3oVFrDRL+t+ilEk9ygvqCocdLWsm/U3PVUTtql/NLE6X0Sxdt0QSDfU/uU3be2qjS5v0Q26D7lMEa3sDoPvU6E2vslxbWyhrt9FKJFtbXKA3F0BUa72v5JoqGn1TYqG3t/wS2nQqbnpsgfr7KL6gpfW56qTY3JBTQuRsbKNLgX9VPmmn5IVsEAEXta/wCtPeuLXGiny0+aHVKIIFtO6jlbYjudPNSAoJFuUdPJPRGgF0Om2o81JB3dYnsDooJKCHA9eqiwvcC6k79LlSBb1VED8q19VAaD9YFVAAdVFzfm0sN0EFo01+5U8p6lampvbRHAb/BBSALm3zUDXpdVkEjshv2A8lLzBSeW1h/xUkA79EIPToFVr8eqYI0IDdkIHNvr3UjU381NmkG51Cl4FIA6i6e8d7W9UJB0AUEanUHyUFRA5b3OmuiA8wv21uovpYKbaWOpstiL6X2sp1Avp80GguVAsTqfvUgEi3u6d1J7jTr6qjc2026Kd731sqKhY7XQnrbUfcoaR8OgQm3QlAN9TcbdFBsdwnMNSdEAB2sgm5PT07qLn/zUk2Oyh2tzpc+agXv+9Njq6+ibi36lTaxKoqJIJOijc2Uk36a3Uajc2v1U6FJvqCfgpABG1vJTodb/ABUaW5id1RBIto4eYQ3Gux3Ck7KNbXspROo6oDsCo2HdAbkkgrIm+pA2Ui3yVOuuie7blP3LQq8rAlFGwuioi+pt8lJO6Inoh1wP2BQPS6IpAJBF7kFVDte6IluCQBy73UkG+vRESiDZwsUdr009ERUTYgAEeajUnXoiKUTuLapqNiiKiXXIvdRY8o91EQS7rre3kpJNyLABETwRq0Ahuh0Ckh3ZEUgXA3Ka2siIAv3Q7XRFkRfsbqb9URagkajmvb4qdDpfVEVEXtoDbuqrke7dEQQLdLKDYgEHdEQRqBvvsh1F9/NEQLG1xY+iktAF+oREEWt10Ci3TXXqURAPfqFIuLgdd0RAFra/BOp9ERSiNbbE2Ua7jQnqiKioWJJ77obdjYdURAPTa+6gNbe4Iv0REEkgEqkaIikE9Lk/AKDv7upRFRVr1NlTa1/NEQSNO/a6NtYgFEQLE6bm9lGutiiKCoi7SO6puCQCiJQubb6E2Q7XsNERUQdDpoh006oiB7wbcC6psAbEXRFPRPujQ38kuO/VES9AbggqDvroiKiNhcqRpcHWwvayIpRLToQdyVBJ6W7IilAk2u0XREWh/9k=";

  /* ══════════════════════════════════════════════════════════════
     STATE
     ══════════════════════════════════════════════════════════════ */
  var state = {
    mode: null,
    currentStep: 1,
    maxVisitedStep: 1,
    stepData: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
    compCount: 1,
    inputs: null,
    rawResult: null,
    sensitivity: { growth: 0, multiple: 0, discount: 0 },
    charts: { methods: null, range: null, captable: null },
  };

  /* ══════════════════════════════════════════════════════════════
     DOM REFERENCES
     ══════════════════════════════════════════════════════════════ */
  var wizardSteps = document.querySelectorAll(".wizard-step");
  var progressSteps = document.querySelectorAll(".progress-step");
  var progressLines = document.querySelectorAll(".progress-line");
  var progressFill = document.getElementById("progress-fill");
  var btnNext = document.getElementById("btn-next");
  var btnBack = document.getElementById("btn-back");
  var warningEl = document.getElementById("wizard-warning");
  var resultsEl = document.getElementById("results");
  var stageSelect = document.getElementById("stage-select");

  var outputEls = {
    company: document.getElementById("result-company"),
    meta: document.getElementById("result-meta"),
    low: document.getElementById("range-low"),
    base: document.getElementById("range-base"),
    high: document.getElementById("range-high"),
    methodTable: document.getElementById("method-table"),
    drivers: document.getElementById("driver-list"),
    timestamp: document.getElementById("timestamp"),
  };

  var sensitivityEls = {
    growth: document.getElementById("sensitivity-growth"),
    multiple: document.getElementById("sensitivity-multiple"),
    discount: document.getElementById("sensitivity-discount"),
    growthVal: document.getElementById("sensitivity-growth-value"),
    multipleVal: document.getElementById("sensitivity-multiple-value"),
    discountVal: document.getElementById("sensitivity-discount-value"),
  };

  var downloadReportBtn = document.getElementById("download-report");
  var downloadModelBtn = document.getElementById("download-model");
  var startOverBtn = document.getElementById("btn-start-over");
  var addCompBtn = document.getElementById("add-comp-btn");

  /* ══════════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════════ */
  init();

  function init() {
    // Mode cards
    document.querySelectorAll(".mode-card").forEach(function (card) {
      card.addEventListener("click", function () {
        document.querySelectorAll(".mode-card").forEach(function (c) { c.classList.remove("selected"); });
        card.classList.add("selected");
        state.mode = card.dataset.mode;
        state.stepData[1].mode = card.dataset.mode;
      });
    });

    // Stage change clears step 3 data
    stageSelect.addEventListener("change", function () {
      state.stepData[3] = {};
    });

    // Wizard navigation
    btnNext.addEventListener("click", handleNext);
    btnBack.addEventListener("click", handleBack);

    // Progress step clicks
    progressSteps.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = parseInt(btn.dataset.step, 10);
        if (target < state.currentStep && target <= state.maxVisitedStep) {
          saveCurrentStepData();
          goToStep(target);
        }
      });
    });

    // Sensitivity sliders
    [sensitivityEls.growth, sensitivityEls.multiple, sensitivityEls.discount].forEach(function (slider) {
      slider.addEventListener("input", handleSensitivityChange);
    });

    // Download buttons
    downloadReportBtn.addEventListener("click", function () {
      if (state.rawResult && state.inputs) downloadPdfReport(state.inputs, state.rawResult);
    });
    downloadModelBtn.addEventListener("click", function () {
      if (state.rawResult && state.inputs) downloadExcelModel(state.inputs, state.rawResult);
    });

    // Start over
    startOverBtn.addEventListener("click", function () {
      state.mode = null;
      state.currentStep = 1;
      state.maxVisitedStep = 1;
      state.stepData = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {} };
      state.compCount = 1;
      state.inputs = null;
      state.rawResult = null;
      state.sensitivity = { growth: 0, multiple: 0, discount: 0 };
      destroyCharts();
      resultsEl.classList.add("hidden");
      document.querySelector(".wizard-panel").classList.remove("hidden");
      document.querySelectorAll(".mode-card").forEach(function (c) { c.classList.remove("selected"); });
      clearAllFields();
      resetCompRows();
      goToStep(1);
    });

    // Slider badge live updates
    document.querySelectorAll(".slider-field input[type='range']").forEach(function (slider) {
      var badge = slider.parentElement.querySelector(".slider-badge");
      if (badge) {
        badge.textContent = slider.value;
        slider.addEventListener("input", function () { badge.textContent = slider.value; });
      }
    });

    // Number formatting on blur/focus
    initFmtNumber(document);

    // Inline validation on blur
    document.querySelectorAll(".field input, .field select").forEach(function (el) {
      el.addEventListener("blur", function () {
        var field = el.closest(".field");
        if (!field) return;
        if (field.classList.contains("hidden") || field.offsetParent === null) return;
        validateSingleField(field);
      });
    });

    // Add comp button
    if (addCompBtn) {
      addCompBtn.addEventListener("click", function () {
        if (state.compCount >= 3) return;
        state.compCount++;
        addCompRow(state.compCount);
        if (state.compCount >= 3) addCompBtn.disabled = true;
      });
    }

    // Cap table sliders
    var ctPremoney = document.getElementById("captable-premoney");
    var ctRaise = document.getElementById("captable-raise");
    if (ctPremoney) ctPremoney.addEventListener("input", updateCapTable);
    if (ctRaise) ctRaise.addEventListener("input", updateCapTable);

    goToStep(1);
  }

  function initFmtNumber(root) {
    root.querySelectorAll(".fmt-number").forEach(function (input) {
      if (input._fmtBound) return;
      input._fmtBound = true;
      input.addEventListener("focus", function () {
        var raw = input.getAttribute("data-raw-value");
        if (raw) input.value = raw;
      });
      input.addEventListener("blur", function () {
        var raw = input.value.replace(/[^0-9.\-]/g, "");
        input.setAttribute("data-raw-value", raw);
        var n = parseFloat(raw);
        if (Number.isFinite(n)) input.value = formatNumberCommas(n);
      });
    });
  }

  function addCompRow(num) {
    var container = document.getElementById("comp-rows");
    var row = document.createElement("div");
    row.className = "comp-row";
    row.setAttribute("data-comp", num);
    row.innerHTML =
      '<input type="text" name="compName' + num + '" placeholder="Company name" class="comp-input" />' +
      '<input type="text" name="compVal' + num + '" placeholder="Valuation ($M)" class="comp-input fmt-number" data-raw-value="" />' +
      '<input type="text" name="compRev' + num + '" placeholder="Revenue ($M)" class="comp-input fmt-number" data-raw-value="" />' +
      '<select name="compStage' + num + '" class="comp-input">' +
        '<option value="">Stage</option>' +
        '<option value="pre-revenue">Pre-revenue</option>' +
        '<option value="early-revenue">Early revenue</option>' +
        '<option value="growth">Growth</option>' +
      '</select>';
    container.appendChild(row);
    initFmtNumber(row);
  }

  function resetCompRows() {
    var container = document.getElementById("comp-rows");
    if (!container) return;
    container.innerHTML =
      '<div class="comp-row" data-comp="1">' +
        '<input type="text" name="compName1" placeholder="Company name" class="comp-input" />' +
        '<input type="text" name="compVal1" placeholder="Valuation ($M)" class="comp-input fmt-number" data-raw-value="" />' +
        '<input type="text" name="compRev1" placeholder="Revenue ($M)" class="comp-input fmt-number" data-raw-value="" />' +
        '<select name="compStage1" class="comp-input">' +
          '<option value="">Stage</option>' +
          '<option value="pre-revenue">Pre-revenue</option>' +
          '<option value="early-revenue">Early revenue</option>' +
          '<option value="growth">Growth</option>' +
        '</select>' +
      '</div>';
    initFmtNumber(container);
    state.compCount = 1;
    if (addCompBtn) addCompBtn.disabled = false;
  }


  /* ══════════════════════════════════════════════════════════════
     WIZARD CONTROLLER
     ══════════════════════════════════════════════════════════════ */
  function handleNext() {
    warningEl.textContent = "";

    if (state.currentStep === 1 && !state.mode) {
      warningEl.textContent = "Please select a mode to continue.";
      return;
    }

    saveCurrentStepData();

    var errors = validateCurrentStep();
    if (errors.length > 0) {
      warningEl.textContent = errors[0];
      return;
    }

    if (state.currentStep === 5) {
      runAndShowResults();
      return;
    }

    goToStep(state.currentStep + 1);
  }

  function handleBack() {
    if (state.currentStep <= 1) return;
    warningEl.textContent = "";
    saveCurrentStepData();
    goToStep(state.currentStep - 1);
  }

  function goToStep(step) {
    state.currentStep = step;
    if (step > state.maxVisitedStep) state.maxVisitedStep = step;

    wizardSteps.forEach(function (el) {
      var s = parseInt(el.dataset.step, 10);
      el.classList.toggle("hidden", s !== step);
    });

    applyDynamicVisibility();
    restoreStepData(step);
    updateProgress();

    btnBack.disabled = step === 1;
    btnNext.textContent = step === 5 ? "Run Valuation" : "Next";
    warningEl.textContent = "";
  }

  function updateProgress() {
    var step = state.currentStep;

    progressSteps.forEach(function (el) {
      var s = parseInt(el.dataset.step, 10);
      el.classList.remove("active", "completed");
      if (s === step) {
        el.classList.add("active");
      } else if (s < step) {
        el.classList.add("completed");
        var numEl = el.querySelector(".step-num");
        if (numEl) numEl.innerHTML = "&#10003;";
      } else {
        var numEl2 = el.querySelector(".step-num");
        if (numEl2) numEl2.textContent = s;
      }
    });

    progressLines.forEach(function (line, idx) {
      line.classList.toggle("filled", idx < step - 1);
    });

    var pct = ((step - 1) / 4) * 100;
    progressFill.style.width = pct + "%";
  }

  /* ══════════════════════════════════════════════════════════════
     DYNAMIC VISIBILITY
     ══════════════════════════════════════════════════════════════ */
  function applyDynamicVisibility() {
    var stage = getStageValue();
    var isDeep = state.mode === "deep";
    var isPreRevenue = stage === "pre-revenue";

    document.querySelectorAll(".prerev-field").forEach(function (el) {
      el.classList.toggle("hidden", !isPreRevenue);
    });
    document.querySelectorAll(".rev-field").forEach(function (el) {
      if (el.classList.contains("deep-field")) {
        el.classList.toggle("hidden", isPreRevenue || !isDeep);
      } else {
        el.classList.toggle("hidden", isPreRevenue);
      }
    });

    document.querySelectorAll(".deep-field").forEach(function (el) {
      if (el.classList.contains("rev-field")) return;
      el.classList.toggle("hidden", !isDeep);
    });

    var descEl = document.getElementById("step3-desc");
    if (descEl) {
      descEl.textContent = isPreRevenue
        ? "Tell us about your product stage and early traction."
        : "Enter your financial metrics and unit economics.";
    }
  }

  function getStageValue() {
    if (state.stepData[2] && state.stepData[2].stage) return state.stepData[2].stage;
    return stageSelect ? stageSelect.value : "early-revenue";
  }

  /* ══════════════════════════════════════════════════════════════
     STEP DATA — SAVE / RESTORE
     ══════════════════════════════════════════════════════════════ */
  function saveCurrentStepData() {
    var stepEl = document.querySelector('.wizard-step[data-step="' + state.currentStep + '"]');
    if (!stepEl) return;
    var data = {};

    stepEl.querySelectorAll("input, select").forEach(function (el) {
      if (!el.name) return;
      var field = el.closest(".field");
      // For comp inputs, always save them
      if (el.classList.contains("comp-input")) {
        if (el.classList.contains("fmt-number")) {
          data[el.name] = el.getAttribute("data-raw-value") || el.value.replace(/[^0-9.\-]/g, "");
        } else {
          data[el.name] = el.value;
        }
        return;
      }
      if (field && (field.classList.contains("hidden") || field.offsetParent === null)) return;

      if (el.classList.contains("fmt-number")) {
        data[el.name] = el.getAttribute("data-raw-value") || el.value.replace(/[^0-9.\-]/g, "");
      } else {
        data[el.name] = el.value;
      }
    });

    if (state.currentStep === 1) data.mode = state.mode;
    if (state.currentStep === 3) data._compCount = state.compCount;

    state.stepData[state.currentStep] = data;
  }

  function restoreStepData(step) {
    var data = state.stepData[step];
    if (!data) return;
    var stepEl = document.querySelector('.wizard-step[data-step="' + step + '"]');
    if (!stepEl) return;

    if (step === 1 && data.mode) {
      state.mode = data.mode;
      document.querySelectorAll(".mode-card").forEach(function (c) {
        c.classList.toggle("selected", c.dataset.mode === data.mode);
      });
    }

    // Restore comp rows for step 3
    if (step === 3 && data._compCount && data._compCount > 1) {
      for (var ci = 2; ci <= data._compCount; ci++) {
        if (!document.querySelector('.comp-row[data-comp="' + ci + '"]')) {
          state.compCount = ci;
          addCompRow(ci);
        }
      }
      if (state.compCount >= 3 && addCompBtn) addCompBtn.disabled = true;
    }

    Object.keys(data).forEach(function (name) {
      if (name === "mode" || name === "_compCount") return;
      var el = stepEl.querySelector('[name="' + name + '"]');
      if (!el) return;
      if (el.classList.contains("fmt-number")) {
        el.setAttribute("data-raw-value", data[name]);
        var n = parseFloat(data[name]);
        el.value = Number.isFinite(n) ? formatNumberCommas(n) : data[name];
      } else {
        el.value = data[name];
      }
    });

    stepEl.querySelectorAll(".slider-field input[type='range']").forEach(function (slider) {
      var badge = slider.parentElement.querySelector(".slider-badge");
      if (badge) badge.textContent = slider.value;
    });
  }

  function clearAllFields() {
    document.querySelectorAll(".wizard-step input, .wizard-step select").forEach(function (el) {
      if (el.type === "range") {
        el.value = el.getAttribute("value") || "3";
      } else if (el.tagName === "SELECT") {
        el.selectedIndex = el.querySelector("[selected]")
          ? Array.from(el.options).findIndex(function (o) { return o.hasAttribute("selected"); })
          : 0;
      } else {
        el.value = el.getAttribute("value") || "";
      }
      if (el.classList.contains("fmt-number")) el.setAttribute("data-raw-value", "");
      var field = el.closest(".field");
      if (field) {
        field.classList.remove("has-error");
        var err = field.querySelector(".field-error");
        if (err) err.textContent = "";
      }
    });
    document.querySelectorAll(".slider-field input[type='range']").forEach(function (slider) {
      var badge = slider.parentElement.querySelector(".slider-badge");
      if (badge) badge.textContent = slider.value;
    });
  }

  /* ══════════════════════════════════════════════════════════════
     VALIDATION
     ══════════════════════════════════════════════════════════════ */
  function validateCurrentStep() {
    var errors = [];
    var step = state.currentStep;

    if (step === 1) {
      if (!state.mode) errors.push("Please select a mode.");
      return errors;
    }

    var stepEl = document.querySelector('.wizard-step[data-step="' + step + '"]');
    if (!stepEl) return errors;

    var fields = stepEl.querySelectorAll(".field");
    fields.forEach(function (field) {
      if (field.classList.contains("hidden") || field.offsetParent === null) return;
      var result = validateSingleField(field);
      if (result) errors.push(result);
    });

    if (step === 2) {
      var data = state.stepData[2];
      if (!data.companyName || !data.companyName.trim()) {
        errors.push("Please enter a company name.");
      }
    }

    return errors;
  }

  function validateSingleField(field) {
    var input = field.querySelector("input, select");
    if (!input || !input.name) return null;

    var errEl = field.querySelector(".field-error");
    var value = input.classList.contains("fmt-number")
      ? (input.getAttribute("data-raw-value") || input.value.replace(/[^0-9.\-]/g, ""))
      : input.value;

    var error = null;

    if (input.type === "text" && !input.classList.contains("fmt-number")) {
      if (!value.trim()) error = "This field is required.";
    }

    if (input.type === "number" || input.classList.contains("fmt-number")) {
      var n = parseFloat(value);
      if (input.name === "companyName") {
        // skip
      } else if (value && !Number.isFinite(n)) {
        error = "Enter a valid number.";
      } else if (input.min && Number.isFinite(n) && n < parseFloat(input.min)) {
        error = "Minimum value is " + input.min + ".";
      } else if (input.max && Number.isFinite(n) && n > parseFloat(input.max)) {
        error = "Maximum value is " + input.max + ".";
      }
    }

    if (input.name === "growthRate") {
      var gv = parseFloat(value);
      if (Number.isFinite(gv) && (gv < -50 || gv > 500)) {
        error = "Growth must be between -50% and 500%.";
      }
    }

    field.classList.toggle("has-error", !!error);
    if (errEl) errEl.textContent = error || "";
    return error;
  }


  /* ══════════════════════════════════════════════════════════════
     COLLECT INPUTS — merges from state.stepData
     ══════════════════════════════════════════════════════════════ */
  function collectInputs() {
    var d = {};
    for (var s = 1; s <= 5; s++) {
      var sd = state.stepData[s];
      if (sd) {
        Object.keys(sd).forEach(function (k) { d[k] = sd[k]; });
      }
    }

    var stage = d.stage || "early-revenue";
    var isPreRevenue = stage === "pre-revenue";

    // Collect comparable transactions
    var compDeals = [];
    for (var ci = 1; ci <= 3; ci++) {
      var cName = d["compName" + ci];
      var cVal = parseFloat(String(d["compVal" + ci] || "").replace(/[^0-9.\-]/g, ""));
      var cRev = parseFloat(String(d["compRev" + ci] || "").replace(/[^0-9.\-]/g, ""));
      var cStage = d["compStage" + ci];
      if (cName && Number.isFinite(cVal) && cVal > 0) {
        compDeals.push({ name: cName, valuation: cVal, revenue: Number.isFinite(cRev) && cRev > 0 ? cRev : 0, stage: cStage || "" });
      }
    }

    var mapped = {
      mode: state.mode || "quick",
      companyName: (d.companyName || "Unnamed startup").trim(),
      stage: stage,
      sector: d.sector || "SaaS",
      geography: d.geography || "US",
      businessModel: d.businessModel || "B2B",
      foundingYear: toNumber(d.foundingYear, 2022),
      aiIntegrated: d.aiIntegrated || "no",
      ipPortfolio: d.ipPortfolio || "none",
      strategicPartnerships: d.strategicPartnerships || "none",
      revenueRunRate: isPreRevenue ? 0 : toMoneyMillions(d.revenueRunRate),
      growthRate: toNumber(d.growthRate, 0),
      grossMargin: toNumber(d.grossMargin, 0),
      customerCount: isPreRevenue ? toNumber(d.earlyUsers, 0) : toNumber(d.customerCount, 0),
      cac: toNumber(d.cac, 0),
      ltv: toNumber(d.ltv, 0),
      churn: toNumber(d.churn, 0),
      tam: toMoneyMillions(d.tam),
      competitionIntensity: toNumber(d.competitionIntensity, 3),
      moatStrength: toNumber(d.moatStrength, 3),
      founderExperience: toNumber(d.founderExperience, 3),
      concentrationRisk: toNumber(d.concentrationRisk, 3),
      regulatoryRisk: toNumber(d.regulatoryRisk, 2),
      teamCompleteness: toNumber(d.teamCompleteness, 3),
      bizPlanQuality: toNumber(d.bizPlanQuality, 3),
      raiseTarget: toMoneyMillions(d.raiseTarget),
      runwayMonths: toNumber(d.runwayMonths, 18),
      targetDilution: toNumber(d.targetDilution, 18),
      founderOwnership: toNumber(d.founderOwnership, 80),
      esopPool: toNumber(d.esopPool, 10),
      existingInvestor: toNumber(d.existingInvestor, 10),
      nrr: toNumber(d.nrr, 100),
      pipelineCoverage: toNumber(d.pipelineCoverage, 2.5),
      burnMultiple: toNumber(d.burnMultiple, 1.8),
      projectedCagr: toNumber(d.projectedCagr, 30),
      productStage: d.productStage || "mvp",
      earlyUsers: toNumber(d.earlyUsers, 0),
      teamSize: toNumber(d.teamSize, 0),
      devMonths: toNumber(d.devMonths, 0),
      techComplexity: toNumber(d.techComplexity, 3),
      ipPatents: d.ipPatents || "no",
      compDeals: compDeals,
    };

    return mapped;
  }

  /* ══════════════════════════════════════════════════════════════
     RUN VALUATION & SHOW RESULTS
     ══════════════════════════════════════════════════════════════ */
  function runAndShowResults() {
    var inputs = collectInputs();
    var errors = validateInputsFinal(inputs);
    if (errors.length > 0) {
      warningEl.textContent = errors[0];
      return;
    }

    state.inputs = inputs;
    resetSensitivity();
    state.rawResult = runValuation(inputs, state.sensitivity);

    document.querySelector(".wizard-panel").classList.add("hidden");
    resultsEl.classList.remove("hidden");
    renderResults(state.rawResult);
    renderCharts(state.rawResult);
    renderMetricsStrip(state.rawResult);
    renderPublicComps(inputs);
    initCapTable(inputs, state.rawResult);
    resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateInputsFinal(inputs) {
    var errors = [];
    if (!inputs.companyName) errors.push("Please add a company name.");
    if (!BENCHMARKS[inputs.geography] || !BENCHMARKS[inputs.geography][inputs.sector]) {
      errors.push("No benchmark profile found for this geography and sector.");
    }
    if (inputs.stage !== "pre-revenue" && inputs.revenueRunRate <= 0) {
      errors.push("Revenue run-rate is required for early-revenue and growth stages.");
    }
    if (inputs.growthRate < -50 || inputs.growthRate > 500) {
      errors.push("Growth must be between -50% and 500%.");
    }
    return errors;
  }

  /* ══════════════════════════════════════════════════════════════
     SENSITIVITY
     ══════════════════════════════════════════════════════════════ */
  function handleSensitivityChange() {
    sensitivityEls.growthVal.textContent = sensitivityEls.growth.value + "%";
    sensitivityEls.multipleVal.textContent = sensitivityEls.multiple.value + "%";
    sensitivityEls.discountVal.textContent = sensitivityEls.discount.value + "%";
    if (!state.inputs) return;
    state.sensitivity = {
      growth: toNumber(sensitivityEls.growth.value, 0),
      multiple: toNumber(sensitivityEls.multiple.value, 0),
      discount: toNumber(sensitivityEls.discount.value, 0),
    };
    state.rawResult = runValuation(state.inputs, state.sensitivity);
    renderResults(state.rawResult);
    renderCharts(state.rawResult);
    renderMetricsStrip(state.rawResult);
  }

  function resetSensitivity() {
    state.sensitivity = { growth: 0, multiple: 0, discount: 0 };
    sensitivityEls.growth.value = "0";
    sensitivityEls.multiple.value = "0";
    sensitivityEls.discount.value = "0";
    sensitivityEls.growthVal.textContent = "0%";
    sensitivityEls.multipleVal.textContent = "0%";
    sensitivityEls.discountVal.textContent = "0%";
  }


  /* ══════════════════════════════════════════════════════════════
     VALUATION ENGINE
     ══════════════════════════════════════════════════════════════ */
  function runValuation(inputs, sensitivity) {
    var methods = [];
    var qualitySignals = computeQualitySignals(inputs);

    if (inputs.stage === "pre-revenue") {
      methods.push(calcScorecard(inputs));
      methods.push(calcBerkus(inputs));
      methods.push(calcRiskFactor(inputs));
      if (inputs.teamSize > 0 && inputs.devMonths > 0) {
        methods.push(calcCostToDuplicate(inputs));
      }
    } else if (inputs.stage === "early-revenue") {
      methods.push(calcRevenueMultiple(inputs));
      methods.push(calcVcMethod(inputs));
      methods.push(calcDcfLite(inputs));
    } else {
      methods.push(calcCompsBlend(inputs));
      methods.push(calcDcf(inputs));
      methods.push(calcVcMethod(inputs));
    }

    // Apply quality multipliers to revenue-based methods
    if (inputs.stage !== "pre-revenue") {
      methods = methods.map(function (m) { return applyQualityMultipliers(m, qualitySignals, inputs); });
    }

    // Add Comparable Transactions if user provided comp deals
    if (inputs.compDeals.length > 0) {
      var compResult = calcComparableTransactions(inputs);
      if (compResult) methods.push(compResult);
    }

    var adjustedMethods = methods.map(function (method) { return applySensitivity(method, sensitivity); });
    var weights = resolveWeights(inputs, adjustedMethods);
    var blended = blendWeighted(adjustedMethods, weights);
    var confidence = calculateConfidence(inputs, adjustedMethods);
    var drivers = identifyDrivers(inputs, adjustedMethods);

    return {
      range: blended,
      methods: adjustedMethods.map(function (method) {
        return Object.assign({}, method, { weight: weights[method.name] || 0 });
      }),
      confidence: confidence,
      drivers: drivers,
      qualitySignals: qualitySignals,
      timestamp: new Date(),
      assumptionsDate: "March 2, 2026",
    };
  }

  /* ── Quality Signals ── */
  function computeQualitySignals(inputs) {
    var signals = { rule40: null, unitEcon: null, aiPremium: inputs.aiIntegrated === "yes" };

    // Rule of 40 (revenue-stage only)
    if (inputs.stage !== "pre-revenue" && inputs.growthRate && inputs.grossMargin) {
      var rule40Score = inputs.growthRate + inputs.grossMargin;
      var grade, multiplier;
      if (rule40Score >= 80) { grade = "Excellent"; multiplier = 1.15; }
      else if (rule40Score >= 60) { grade = "Good"; multiplier = 1.08; }
      else if (rule40Score >= 40) { grade = "Good"; multiplier = 1.02; }
      else if (rule40Score >= 30) { grade = "Fair"; multiplier = 1.0; }
      else if (rule40Score >= 20) { grade = "Fair"; multiplier = 0.95; }
      else { grade = "Weak"; multiplier = 0.88; }
      signals.rule40 = { score: rule40Score, grade: grade, multiplier: multiplier };
    }

    // Unit Economics (revenue-stage, when LTV & CAC provided)
    if (inputs.stage !== "pre-revenue" && inputs.ltv > 0 && inputs.cac > 0) {
      var ltvCac = inputs.ltv / inputs.cac;
      var paybackMonths = inputs.cac > 0 ? Math.round((inputs.cac / (inputs.ltv / 36)) * 10) / 10 : 0;
      var ueGrade, ueMultiplier;
      if (ltvCac >= 5) { ueGrade = "Excellent"; ueMultiplier = 1.15; }
      else if (ltvCac >= 3) { ueGrade = "Good"; ueMultiplier = 1.06; }
      else if (ltvCac >= 2) { ueGrade = "Fair"; ueMultiplier = 0.97; }
      else { ueGrade = "Weak"; ueMultiplier = 0.88; }
      signals.unitEcon = { ltvCac: ltvCac, paybackMonths: paybackMonths, grade: ueGrade, multiplier: ueMultiplier };
    }

    return signals;
  }

  function applyQualityMultipliers(method, signals, inputs) {
    var multiplier = 1.0;
    // Rule of 40 — applies to revenue-based methods
    if (signals.rule40) {
      var r40Methods = ["Revenue Multiple", "Comps Blend", "VC Method"];
      if (r40Methods.indexOf(method.name) !== -1) {
        multiplier *= signals.rule40.multiplier;
      }
    }
    // Unit economics
    if (signals.unitEcon) {
      var ueTargets = ["Revenue Multiple", "Comps Blend", "DCF-lite", "DCF"];
      if (ueTargets.indexOf(method.name) !== -1) {
        multiplier *= signals.unitEcon.multiplier;
      }
    }
    if (multiplier === 1.0) return method;
    return { name: method.name, low: method.low * multiplier, base: method.base * multiplier, high: method.high * multiplier };
  }

  function getAiAdjustedBench(inputs) {
    var bench = getBench(inputs);
    if (inputs.aiIntegrated !== "yes") return bench;
    return {
      rev: [bench.rev[0] * 1.175, bench.rev[1] * 1.175, bench.rev[2] * 1.175],
      ebitda: bench.ebitda,
      preseed: bench.preseed * 1.10,
    };
  }

  /* ── Existing Methods (updated for AI premium + Deep Dive signals) ── */
  function calcBerkus(inputs) {
    var benchmark = getAiAdjustedBench(inputs);
    var maxPerFactor = benchmark.preseed / 5;
    var factors = [
      inputs.founderExperience,
      inputs.moatStrength,
      scoreFromCustomers(inputs.customerCount),
      scoreFromTam(inputs.tam),
      6 - inputs.competitionIntensity,
    ];
    var base = factors.reduce(function (sum, score) { return sum + (clamp(score, 1, 5) / 5) * maxPerFactor; }, 0);
    return { name: "Berkus", low: base * 0.78, base: base, high: base * 1.24 };
  }

  function calcScorecard(inputs) {
    var benchmark = getAiAdjustedBench(inputs);
    var basePremoney = benchmark.preseed;

    var weightedScore;
    if (inputs.mode === "deep") {
      // Deep mode: blend in IP, partnerships, team completeness, biz plan at 15% total
      var ipScore = inputs.ipPortfolio === "granted" ? 5 : inputs.ipPortfolio === "pending" ? 3.5 : 2;
      var partnerScore = inputs.strategicPartnerships === "exclusive" ? 5 :
        inputs.strategicPartnerships === "formal" ? 4 :
        inputs.strategicPartnerships === "informal" ? 3 : 1.5;
      var deepSignal =
        0.04 * scale(ipScore, 1, 5, 0.8, 1.2) +
        0.04 * scale(partnerScore, 1, 5, 0.8, 1.2) +
        0.04 * scale(inputs.teamCompleteness, 1, 5, 0.78, 1.22) +
        0.03 * scale(inputs.bizPlanQuality, 1, 5, 0.8, 1.2);
      weightedScore =
        0.255 * scale(inputs.founderExperience, 1, 5, 0.75, 1.25) +
        0.2125 * scale(scoreFromTam(inputs.tam), 1, 5, 0.8, 1.25) +
        0.17 * scale(inputs.moatStrength, 1, 5, 0.78, 1.23) +
        0.1275 * scale(6 - inputs.competitionIntensity, 1, 5, 0.8, 1.18) +
        0.085 * scale(scoreFromCustomers(inputs.customerCount), 1, 5, 0.78, 1.2) +
        deepSignal;
    } else {
      weightedScore =
        0.3 * scale(inputs.founderExperience, 1, 5, 0.75, 1.25) +
        0.25 * scale(scoreFromTam(inputs.tam), 1, 5, 0.8, 1.25) +
        0.2 * scale(inputs.moatStrength, 1, 5, 0.78, 1.23) +
        0.15 * scale(6 - inputs.competitionIntensity, 1, 5, 0.8, 1.18) +
        0.1 * scale(scoreFromCustomers(inputs.customerCount), 1, 5, 0.78, 1.2);
    }
    var base = basePremoney * weightedScore;
    return { name: "Scorecard", low: base * 0.8, base: base, high: base * 1.2 };
  }

  function calcRiskFactor(inputs) {
    var benchmark = getAiAdjustedBench(inputs);
    var base = benchmark.preseed;
    var adjustments =
      (inputs.founderExperience - 3) * 0.25 +
      (inputs.moatStrength - 3) * 0.2 -
      (inputs.competitionIntensity - 3) * 0.22 -
      (inputs.concentrationRisk - 3) * 0.2 -
      (inputs.regulatoryRisk - 3) * 0.18;

    // Deep Dive adjustments
    if (inputs.mode === "deep") {
      // IP adjustment
      if (inputs.ipPortfolio === "granted") adjustments += 0.35;
      else if (inputs.ipPortfolio === "pending") adjustments += 0.15;
      // Partnership adjustment
      if (inputs.strategicPartnerships === "exclusive") adjustments += 0.35;
      else if (inputs.strategicPartnerships === "formal") adjustments += 0.2;
      else if (inputs.strategicPartnerships === "informal") adjustments += 0.05;
      else adjustments -= 0.1;
      // Team completeness
      adjustments += (inputs.teamCompleteness - 3) * 0.18;
      // Business plan
      adjustments += (inputs.bizPlanQuality - 3) * 0.15;
    }

    var output = clamp(base + adjustments, 0.7, 200);
    return { name: "Risk Factor", low: output * 0.85, base: output, high: output * 1.16 };
  }

  function calcRevenueMultiple(inputs) {
    var bench = getAiAdjustedBench(inputs);
    var revenue = clamp(inputs.revenueRunRate, 0.01, 100000);
    return {
      name: "Revenue Multiple",
      low: revenue * bench.rev[0],
      base: revenue * bench.rev[1],
      high: revenue * bench.rev[2],
    };
  }

  function calcCompsBlend(inputs) {
    var bench = getAiAdjustedBench(inputs);
    var revenue = clamp(inputs.revenueRunRate, 0.01, 100000);
    var ebitdaMargin = clamp((inputs.grossMargin / 100) * 0.42 - 0.08, -0.2, 0.5);
    var ebitda = revenue * ebitdaMargin;
    var low = revenue * bench.rev[0] * 0.65 + ebitda * bench.ebitda[0] * 0.35;
    var base = revenue * bench.rev[1] * 0.6 + ebitda * bench.ebitda[1] * 0.4;
    var high = revenue * bench.rev[2] * 0.55 + ebitda * bench.ebitda[2] * 0.45;
    return {
      name: "Comps Blend",
      low: Math.max(low, revenue * bench.rev[0] * 0.7),
      base: Math.max(base, revenue * bench.rev[1] * 0.72),
      high: Math.max(high, revenue * bench.rev[2] * 0.75),
    };
  }

  function calcVcMethod(inputs) {
    var bench = getAiAdjustedBench(inputs);
    var currentRevenue = Math.max(inputs.revenueRunRate, bench.preseed * 0.08);
    var growth = clamp((inputs.growthRate || 25) / 100, -0.1, 1.4);
    var cagr = inputs.mode === "deep" ? clamp(inputs.projectedCagr / 100, 0, 1.2) : growth;
    var fiveYearRevenue = currentRevenue * Math.pow(1 + (growth + cagr) / 2, 5);
    var exitValueLow = fiveYearRevenue * bench.rev[0] * 0.9;
    var exitValueBase = fiveYearRevenue * bench.rev[1];
    var exitValueHigh = fiveYearRevenue * bench.rev[2] * 1.08;
    var targetReturn = inputs.stage === "growth" ? 3.8 : inputs.stage === "early-revenue" ? 6.5 : 10.5;
    var raise = Math.max(inputs.raiseTarget, 0.1);
    var preLow = Math.max(exitValueLow / (targetReturn * 1.15) - raise, 0.2);
    var preBase = Math.max(exitValueBase / targetReturn - raise, 0.3);
    var preHigh = Math.max(exitValueHigh / (targetReturn * 0.88) - raise, 0.5);
    return { name: "VC Method", low: preLow, base: preBase, high: preHigh };
  }

  function calcDcfLite(inputs) {
    return calcDcfCore(inputs, {
      years: 5,
      startDiscount: inputs.geography === "US" ? 0.3 : 0.33,
      terminalGrowth: 0.025,
      marginLift: 0.08,
      name: "DCF-lite",
    });
  }

  function calcDcf(inputs) {
    return calcDcfCore(inputs, {
      years: 6,
      startDiscount: inputs.geography === "US" ? 0.22 : 0.25,
      terminalGrowth: 0.03,
      marginLift: 0.12,
      name: "DCF",
    });
  }

  function calcDcfCore(inputs, options) {
    var initialRevenue = Math.max(inputs.revenueRunRate, 0.2);
    var initialGrowth = clamp((inputs.growthRate || 20) / 100, -0.05, 1.1);
    var terminalGrowth = options.terminalGrowth;
    var discountRate = options.startDiscount;
    var burnPenalty = clamp((inputs.burnMultiple || 1.8) * 0.02, 0.01, 0.12);
    var marginStart = clamp(inputs.grossMargin / 100 - 0.62 - burnPenalty, -0.25, 0.18);
    var marginEnd = clamp(marginStart + options.marginLift, -0.15, 0.35);
    var revenue = initialRevenue;
    var pv = 0;
    for (var year = 1; year <= options.years; year += 1) {
      var progress = year / options.years;
      var growth = initialGrowth + (terminalGrowth - initialGrowth) * progress;
      var margin = marginStart + (marginEnd - marginStart) * progress;
      revenue *= 1 + growth;
      var fcf = revenue * margin;
      pv += fcf / Math.pow(1 + discountRate, year);
    }
    var finalRevenue = revenue * (1 + terminalGrowth);
    var terminalMargin = marginEnd;
    var terminalFcf = finalRevenue * terminalMargin;
    var terminalValue = terminalFcf / Math.max(discountRate - terminalGrowth, 0.08);
    var enterpriseValue = pv + terminalValue / Math.pow(1 + discountRate, options.years);
    var base = clamp(enterpriseValue, 0.2, 250000);
    return { name: options.name, low: base * 0.72, base: base, high: base * 1.35 };
  }

  /* ── NEW: Cost-to-Duplicate (pre-revenue) ── */
  function calcCostToDuplicate(inputs) {
    var complexityMultiplier = [0.7, 0.85, 1.0, 1.25, 1.6][clamp(inputs.techComplexity, 1, 5) - 1];
    var ipPremium = inputs.ipPatents === "yes" ? 1.35 : 1.0;
    var monthlyCostPerPerson = 0.012; // $12K/month in $M
    var rebuildCost = inputs.teamSize * inputs.devMonths * monthlyCostPerPerson * complexityMultiplier * ipPremium;
    var base = clamp(rebuildCost, 0.1, 200);
    return { name: "Cost-to-Duplicate", low: base * 0.75, base: base, high: base * 1.3 };
  }

  /* ── NEW: Comparable Transactions ── */
  function calcComparableTransactions(inputs) {
    var deals = inputs.compDeals;
    if (deals.length === 0) return null;

    // Calculate implied multiples from comps that have revenue
    var multiples = [];
    var avgVal = 0;
    deals.forEach(function (deal) {
      if (deal.revenue > 0) {
        multiples.push(deal.valuation / deal.revenue);
      }
      avgVal += deal.valuation;
    });
    avgVal /= deals.length;

    if (multiples.length > 0 && inputs.revenueRunRate > 0) {
      // Use implied multiples on user's revenue
      var avgMultiple = multiples.reduce(function (s, v) { return s + v; }, 0) / multiples.length;
      var base = inputs.revenueRunRate * avgMultiple;
      return { name: "Comparable Transactions", low: base * 0.75, base: base, high: base * 1.25 };
    } else {
      // Use average valuation from comps directly
      return { name: "Comparable Transactions", low: avgVal * 0.7, base: avgVal, high: avgVal * 1.3 };
    }
  }

  function applySensitivity(method, sensitivity) {
    var profile = EXPOSURES[method.name] || { growth: 0.2, multiple: 0.2, discount: 0.2 };
    var growthImpact = (sensitivity.growth / 100) * profile.growth;
    var multipleImpact = (sensitivity.multiple / 100) * profile.multiple;
    var discountImpact = (sensitivity.discount / 100) * profile.discount;
    var multiplier = clamp(1 + growthImpact + multipleImpact - discountImpact, 0.5, 1.9);
    return {
      name: method.name,
      low: method.low * multiplier,
      base: method.base * multiplier,
      high: method.high * multiplier,
    };
  }

  function resolveWeights(inputs, methods) {
    var stage = inputs.stage;
    var hasCtd = methods.some(function (m) { return m.name === "Cost-to-Duplicate"; });
    var hasComps = methods.some(function (m) { return m.name === "Comparable Transactions"; });

    var weightKey = stage;
    if (stage === "pre-revenue" && hasCtd) weightKey = "pre-revenue-ctd";
    var defined = METHOD_WEIGHTS[weightKey] || METHOD_WEIGHTS[stage];

    var weights = {};
    var coreSum = 0;
    methods.forEach(function (method) {
      if (method.name === "Comparable Transactions") return;
      var weight = defined[method.name] || 0;
      weights[method.name] = weight;
      coreSum += weight;
    });

    // If Comparable Transactions present, give it 20%, scale others to 80%
    if (hasComps) {
      var scaleFactor = coreSum > 0 ? 0.8 / coreSum : 0;
      Object.keys(weights).forEach(function (k) { weights[k] *= scaleFactor; });
      weights["Comparable Transactions"] = 0.2;
    } else if (coreSum > 0) {
      Object.keys(weights).forEach(function (k) { weights[k] /= coreSum; });
    }

    var sum = 0;
    Object.keys(weights).forEach(function (k) { sum += weights[k]; });
    if (sum <= 0) {
      var equal = 1 / methods.length;
      methods.forEach(function (m) { weights[m.name] = equal; });
    }

    return weights;
  }

  function blendWeighted(methods, weights) {
    return methods.reduce(function (acc, method) {
      var w = weights[method.name] || 0;
      acc.low += method.low * w;
      acc.base += method.base * w;
      acc.high += method.high * w;
      return acc;
    }, { low: 0, base: 0, high: 0 });
  }

  function calculateConfidence(inputs, methods) {
    var completeness = scoreCompleteness(inputs);
    var consistency = scoreConsistency(inputs);
    var benchmarkCoverage = methods.length >= 3 ? 92 : 70;
    var outlierPenalty = scoreOutlierPenalty(inputs);
    var score = clamp(
      0.42 * completeness + 0.33 * consistency + 0.18 * benchmarkCoverage + 0.07 * (100 - outlierPenalty),
      35, 96
    );
    return {
      score: Math.round(score),
      label: score >= 80 ? "High" : score >= 65 ? "Medium" : "Low",
      parts: { completeness: completeness, consistency: consistency, benchmarkCoverage: benchmarkCoverage, outlierPenalty: outlierPenalty },
    };
  }

  function scoreCompleteness(inputs) {
    var required = [
      "companyName", "stage", "sector", "geography", "tam",
      "founderExperience", "moatStrength", "competitionIntensity",
      "raiseTarget", "runwayMonths", "targetDilution",
    ];
    if (inputs.stage !== "pre-revenue") {
      required.push("revenueRunRate", "growthRate", "grossMargin", "customerCount");
    }
    if (inputs.mode === "deep") {
      required.push("nrr", "pipelineCoverage", "burnMultiple", "projectedCagr");
    }
    var filled = required.filter(function (field) {
      var value = inputs[field];
      if (value === null || value === undefined) return false;
      if (typeof value === "string") return value.trim().length > 0;
      return Number.isFinite(value) && value !== 0;
    }).length;
    return Math.round((filled / required.length) * 100);
  }

  function scoreConsistency(inputs) {
    var score = 90;
    if (inputs.ltv > 0 && inputs.cac > 0 && inputs.ltv / inputs.cac < 2) score -= 10;
    if (inputs.churn > 22) score -= 9;
    if (inputs.runwayMonths < 10) score -= 7;
    if (inputs.targetDilution > 30) score -= 5;
    if (inputs.mode === "deep" && inputs.pipelineCoverage < 1.5) score -= 6;
    return clamp(score, 40, 95);
  }

  function scoreOutlierPenalty(inputs) {
    var penalty = 0;
    if (inputs.growthRate > 220) penalty += 18;
    if (inputs.grossMargin > 95) penalty += 12;
    if (inputs.tam > 1500000) penalty += 8;
    if (inputs.revenueRunRate > 0 && inputs.revenueRunRate < 0.05 && inputs.stage !== "pre-revenue") penalty += 12;
    return clamp(penalty, 0, 45);
  }

  function identifyDrivers(inputs, methods) {
    var benchmark = getBench(inputs);
    var avgMethodBase = methods.reduce(function (sum, m) { return sum + m.base; }, 0) / methods.length;
    var drivers = [
      {
        label: "Revenue multiple baseline in " + inputs.geography + " " + inputs.sector + ": " + benchmark.rev[1].toFixed(1) + "x",
        impact: benchmark.rev[1] * 4,
      },
      {
        label: "Growth profile at " + (inputs.growthRate || 0) + "% annualized",
        impact: (inputs.growthRate || 0) * 0.5,
      },
      {
        label: "Moat vs competition spread: " + inputs.moatStrength + " / " + inputs.competitionIntensity,
        impact: (inputs.moatStrength - inputs.competitionIntensity) * 12,
      },
      {
        label: "Runway and raise plan: " + inputs.runwayMonths + " months, " + formatMoney(inputs.raiseTarget, inputs.geography) + " raise",
        impact: inputs.runwayMonths - (inputs.raiseTarget / Math.max(avgMethodBase, 0.001)) * 12,
      },
      {
        label: "Risk posture (concentration " + inputs.concentrationRisk + ", regulatory " + inputs.regulatoryRisk + ")",
        impact: -1 * (inputs.concentrationRisk + inputs.regulatoryRisk) * 6,
      },
    ];
    if (inputs.aiIntegrated === "yes") {
      drivers.push({ label: "AI-integrated product premium applied (+17.5% rev multiples)", impact: 25 });
    }
    return drivers
      .sort(function (a, b) { return Math.abs(b.impact) - Math.abs(a.impact); })
      .slice(0, 5)
      .map(function (item) { return item.label; });
  }


  /* ══════════════════════════════════════════════════════════════
     RENDER RESULTS
     ══════════════════════════════════════════════════════════════ */
  function renderResults(result) {
    var inputs = state.inputs;
    outputEls.company.textContent = inputs.companyName || "Startup";
    outputEls.meta.textContent =
      titleCase(inputs.stage) + " \u2022 " + inputs.sector + " \u2022 " +
      inputs.geography + " \u2022 " + titleCase(inputs.mode);
    outputEls.low.textContent = formatMoney(result.range.low, inputs.geography);
    outputEls.base.textContent = formatMoney(result.range.base, inputs.geography);
    outputEls.high.textContent = formatMoney(result.range.high, inputs.geography);
    outputEls.timestamp.textContent = "Benchmark assumptions last updated: " + result.assumptionsDate;

    // Method table
    outputEls.methodTable.innerHTML = "";
    result.methods.forEach(function (method) {
      var row = document.createElement("tr");
      row.innerHTML =
        "<td>" + escapeHtml(method.name) + "</td>" +
        "<td>" + Math.round(method.weight * 100) + "%</td>" +
        "<td>" + escapeHtml(formatMoney(method.low, inputs.geography)) + "</td>" +
        "<td>" + escapeHtml(formatMoney(method.base, inputs.geography)) + "</td>" +
        "<td>" + escapeHtml(formatMoney(method.high, inputs.geography)) + "</td>";
      outputEls.methodTable.appendChild(row);
    });

    // Drivers
    outputEls.drivers.innerHTML = "";
    result.drivers.forEach(function (driver) {
      var li = document.createElement("li");
      li.textContent = driver;
      outputEls.drivers.appendChild(li);
    });
  }

  /* ── Quality Metrics Strip ── */
  function renderMetricsStrip(result) {
    var container = document.getElementById("metrics-cards");
    var strip = document.getElementById("metrics-strip");
    if (!container || !strip) return;

    container.innerHTML = "";
    var signals = result.qualitySignals;
    var hasCards = false;

    if (signals.rule40) {
      hasCards = true;
      container.innerHTML += buildMetricCard("Rule of 40", signals.rule40.score + "%", signals.rule40.grade);
    }

    if (signals.unitEcon) {
      hasCards = true;
      container.innerHTML += buildMetricCard("LTV/CAC Ratio", signals.unitEcon.ltvCac.toFixed(1) + "x", signals.unitEcon.grade);
      container.innerHTML += buildMetricCard("Payback Period", signals.unitEcon.paybackMonths.toFixed(0) + " mo", null);
    }

    if (signals.aiPremium) {
      hasCards = true;
      container.innerHTML += '<div class="metric-card"><p class="metric-card-label">AI Premium</p><span class="metric-card-badge">+17.5% Applied</span></div>';
    }

    strip.classList.toggle("hidden", !hasCards);
  }

  function buildMetricCard(label, value, grade) {
    var gradeHtml = "";
    if (grade) {
      var cls = grade === "Excellent" ? "grade-excellent" : grade === "Good" ? "grade-good" : grade === "Fair" ? "grade-fair" : "grade-weak";
      gradeHtml = '<span class="metric-card-grade ' + cls + '">' + escapeHtml(grade) + '</span>';
    }
    return '<div class="metric-card"><p class="metric-card-label">' + escapeHtml(label) + '</p><p class="metric-card-value">' + escapeHtml(value) + '</p>' + gradeHtml + '</div>';
  }

  /* ── Public Company Comps ── */
  function renderPublicComps(inputs) {
    var section = document.getElementById("public-comps-section");
    var tbody = document.getElementById("public-comps-table");
    if (!section || !tbody) return;

    if (inputs.stage !== "growth") {
      section.classList.add("hidden");
      return;
    }

    var comps = PUBLIC_COMPS[inputs.sector];
    if (!comps || comps.length === 0) {
      section.classList.add("hidden");
      return;
    }

    tbody.innerHTML = "";
    comps.forEach(function (comp) {
      var row = document.createElement("tr");
      row.innerHTML =
        "<td>" + escapeHtml(comp.name) + "</td>" +
        "<td>" + escapeHtml(comp.ticker) + "</td>" +
        "<td>" + comp.evRev.toFixed(1) + "x</td>";
      tbody.appendChild(row);
    });
    section.classList.remove("hidden");
  }

  /* ── Cap Table Simulator ── */
  function initCapTable(inputs, result) {
    var section = document.getElementById("captable-section");
    if (!section) return;

    var premoneySlider = document.getElementById("captable-premoney");
    var raiseSlider = document.getElementById("captable-raise");
    if (!premoneySlider || !raiseSlider) return;

    // Set slider defaults from result
    var baseVal = Math.max(result.range.base, 0.5);
    premoneySlider.max = Math.max(Math.round(baseVal * 3), 10);
    premoneySlider.value = Math.round(baseVal * 10) / 10;
    raiseSlider.value = Math.round(inputs.raiseTarget * 10) / 10;
    raiseSlider.max = Math.max(Math.round(baseVal), 5);

    section.classList.remove("hidden");
    updateCapTable();
  }

  function updateCapTable() {
    var premoneySlider = document.getElementById("captable-premoney");
    var raiseSlider = document.getElementById("captable-raise");
    var premoneyValEl = document.getElementById("captable-premoney-val");
    var raiseValEl = document.getElementById("captable-raise-val");
    var summaryEl = document.getElementById("captable-summary");
    if (!premoneySlider || !raiseSlider || !state.inputs) return;

    var premoney = parseFloat(premoneySlider.value);
    var raise = parseFloat(raiseSlider.value);
    var geo = state.inputs.geography;

    premoneyValEl.textContent = formatMoney(premoney, geo);
    raiseValEl.textContent = formatMoney(raise, geo);

    var postmoney = premoney + raise;
    var newInvestorPct = (raise / postmoney) * 100;
    var dilution = newInvestorPct / 100;

    var founderPre = state.inputs.founderOwnership;
    var esopPre = state.inputs.esopPool;
    var existingPre = state.inputs.existingInvestor;

    var founderPost = founderPre * (1 - dilution);
    var esopPost = esopPre * (1 - dilution);
    var existingPost = existingPre * (1 - dilution);

    summaryEl.innerHTML =
      '<div class="captable-summary-row"><span class="captable-summary-label">Post-money</span><span>' + formatMoney(postmoney, geo) + '</span></div>' +
      '<div class="captable-summary-row"><span class="captable-summary-label">New investor</span><span>' + newInvestorPct.toFixed(1) + '%</span></div>' +
      '<div class="captable-summary-row"><span class="captable-summary-label">Founders</span><span>' + founderPost.toFixed(1) + '%</span></div>' +
      '<div class="captable-summary-row"><span class="captable-summary-label">ESOP</span><span>' + esopPost.toFixed(1) + '%</span></div>' +
      '<div class="captable-summary-row"><span class="captable-summary-label">Existing investors</span><span>' + existingPost.toFixed(1) + '%</span></div>';

    renderCapTableChart(founderPost, esopPost, existingPost, newInvestorPct);
  }

  function renderCapTableChart(founder, esop, existing, newInvestor) {
    if (typeof Chart === "undefined") return;
    if (state.charts.captable) { state.charts.captable.destroy(); state.charts.captable = null; }

    var ctx = document.getElementById("chart-captable");
    if (!ctx) return;

    state.charts.captable = new Chart(ctx.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Founders", "ESOP", "Existing Investors", "New Investor"],
        datasets: [{
          data: [founder, esop, existing, newInvestor],
          backgroundColor: ["#1a1a1a", "#666666", "#999999", "#cccccc"],
          borderWidth: 2,
          borderColor: "#fff",
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: function (ctx) { return ctx.label + ": " + ctx.parsed.toFixed(1) + "%"; },
            },
          },
        },
      },
    });
  }


  /* ══════════════════════════════════════════════════════════════
     CHART.JS — Method Comparison & Range Visualization
     ══════════════════════════════════════════════════════════════ */
  function destroyCharts() {
    if (state.charts.methods) { state.charts.methods.destroy(); state.charts.methods = null; }
    if (state.charts.range) { state.charts.range.destroy(); state.charts.range = null; }
    if (state.charts.captable) { state.charts.captable.destroy(); state.charts.captable = null; }
  }

  function renderCharts(result) {
    if (typeof Chart === "undefined") return;
    if (state.charts.methods) { state.charts.methods.destroy(); state.charts.methods = null; }
    if (state.charts.range) { state.charts.range.destroy(); state.charts.range = null; }

    var inputs = state.inputs;
    var methods = result.methods;
    var labels = methods.map(function (m) { return m.name; });

    // Method Comparison — grouped bar
    var ctxMethods = document.getElementById("chart-methods").getContext("2d");
    state.charts.methods = new Chart(ctxMethods, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          { label: "Low", data: methods.map(function (m) { return roundNum(m.low, 2); }), backgroundColor: "#c0c0c0" },
          { label: "Base", data: methods.map(function (m) { return roundNum(m.base, 2); }), backgroundColor: "#555555" },
          { label: "High", data: methods.map(function (m) { return roundNum(m.high, 2); }), backgroundColor: "#1a1a1a" },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 14, font: { size: 11 } } },
          tooltip: {
            callbacks: { label: function (ctx) { return ctx.dataset.label + ": " + formatMoney(ctx.parsed.y, inputs.geography); } },
          },
        },
        scales: {
          y: { beginAtZero: true, grid: { display: false }, ticks: { callback: function (val) { return formatMoney(val, inputs.geography); }, font: { size: 10 } } },
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
        },
      },
    });

    // Range Visualization — horizontal floating bar
    var rangeLabels = labels.concat(["Blended"]);
    var rangeLow = methods.map(function (m) { return roundNum(m.low, 2); }).concat([roundNum(result.range.low, 2)]);
    var rangeHigh = methods.map(function (m) { return roundNum(m.high, 2); }).concat([roundNum(result.range.high, 2)]);
    var floatingData = rangeLow.map(function (low, i) { return [low, rangeHigh[i]]; });

    var ctxRange = document.getElementById("chart-range").getContext("2d");
    state.charts.range = new Chart(ctxRange, {
      type: "bar",
      data: {
        labels: rangeLabels,
        datasets: [{
          label: "Valuation Range",
          data: floatingData,
          backgroundColor: rangeLabels.map(function (_, i) { return i === rangeLabels.length - 1 ? "#1a1a1a" : "#888888"; }),
          borderRadius: 4,
        }],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: function (ctx) { var raw = ctx.raw; return formatMoney(raw[0], inputs.geography) + " \u2013 " + formatMoney(raw[1], inputs.geography); } },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { callback: function (val) { return formatMoney(val, inputs.geography); }, font: { size: 10 } } },
          y: { grid: { display: false }, ticks: { font: { size: 10 } } },
        },
      },
    });
  }


  /* ══════════════════════════════════════════════════════════════
     PDF EXPORT — jsPDF with logo, methodology, branded layout
     ══════════════════════════════════════════════════════════════ */
  function generateMethodologyNote(inputs, result) {
    var methodNames = result.methods.map(function (m) {
      return m.name + " (" + Math.round(m.weight * 100) + "%)";
    });
    var note = "This valuation blends " + methodNames.join(", ") +
      ", calibrated to " + inputs.geography + " " + inputs.sector + " benchmarks.";
    if (inputs.aiIntegrated === "yes") {
      note += " An AI-integration premium of 17.5% has been applied to revenue multiples.";
    }
    if (result.qualitySignals.rule40) {
      note += " Rule of 40 score: " + result.qualitySignals.rule40.score + "% (" + result.qualitySignals.rule40.grade + ").";
    }
    if (result.qualitySignals.unitEcon) {
      note += " LTV/CAC ratio: " + result.qualitySignals.unitEcon.ltvCac.toFixed(1) + "x (" + result.qualitySignals.unitEcon.grade + ").";
    }
    return note;
  }

  function downloadPdfReport(inputs, result) {
    var JsPDF = (window.jspdf && window.jspdf.jsPDF) || (window.jsPDF);
    if (!JsPDF) {
      alert("PDF library not loaded. Please check your internet connection.");
      return;
    }

    var doc = new JsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    var pw = doc.internal.pageSize.getWidth();
    var ph = doc.internal.pageSize.getHeight();
    var m = 15;
    var usable = pw - 2 * m;
    var y = 15;
    var geo = inputs.geography;
    var curr = CURRENCY_MAP[geo] || "$";

    // ── 1. Header — 3-column layout ──
    // Logo
    if (LOGO_BASE64) {
      try {
        doc.addImage("data:image/jpeg;base64," + LOGO_BASE64, "JPEG", m, y, 18, 18);
      } catch (e) { /* skip logo on error */ }
    }
    // Left column: brand
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17);
    doc.text("THE VC CORNER", m + 21, y + 7);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Founder Valuation Studio", m + 21, y + 12);
    // Center column: company name
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17);
    doc.text(inputs.companyName, pw / 2, y + 7, { align: "center" });
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Valuation Report", pw / 2, y + 12, { align: "center" });
    // Right column: meta
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(titleCase(inputs.stage) + " | " + inputs.sector + " | " + geo, pw - m, y + 7, { align: "right" });
    var genDate = result.timestamp;
    var dateStr = genDate.toLocaleString(undefined, { year: "numeric", month: "short", day: "2-digit" });
    doc.text("Generated: " + dateStr, pw - m, y + 12, { align: "right" });
    y += 20;
    // Thin grey line
    doc.setDrawColor(180);
    doc.setLineWidth(0.3);
    doc.line(m, y, pw - m, y);
    y += 7;

    // ── 2. Valuation Range — highlight band ──
    doc.setFillColor(240, 240, 240);
    doc.rect(m, y, usable, 20, "F");
    var bandColW = usable / 3;
    var rangeData = [
      { label: "LOW", val: result.range.low },
      { label: "BASE", val: result.range.base },
      { label: "HIGH", val: result.range.high },
    ];
    rangeData.forEach(function (r, i) {
      var cx = m + bandColW * i + bandColW / 2;
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120);
      doc.text(r.label, cx, y + 7, { align: "center" });
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(17);
      doc.text(formatMoney(r.val, geo), cx, y + 16, { align: "center" });
    });
    y += 24;

    // ── 3. Key Metrics — single compact line ──
    var metricsLine = [];
    if (inputs.stage !== "pre-revenue") {
      metricsLine.push("Revenue: " + formatMoney(inputs.revenueRunRate, geo));
      metricsLine.push("Growth: " + inputs.growthRate + "%");
      metricsLine.push("GM: " + inputs.grossMargin + "%");
    }
    if (inputs.customerCount > 0) metricsLine.push("Customers: " + formatNumberCommas(inputs.customerCount));
    if (inputs.tam > 0) metricsLine.push("TAM: " + formatMoney(inputs.tam, geo));
    if (result.qualitySignals.rule40) metricsLine.push("R40: " + result.qualitySignals.rule40.score + "%");
    if (metricsLine.length > 0) {
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80);
      doc.text(metricsLine.join("  |  "), m, y + 3);
      y += 8;
    }

    // ── 4. Methodology Note ──
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    var methNote = generateMethodologyNote(inputs, result);
    var methLines = doc.splitTextToSize(methNote, usable);
    doc.text(methLines, m, y + 3);
    y += methLines.length * 3.5 + 6;

    // ── 5. Method Breakdown Table ──
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17);
    doc.text("METHOD BREAKDOWN", m, y);
    y += 5;
    // Header row
    var tCols = [m, m + 50, m + 72, m + 102, m + 132];
    var tLabels = ["Method", "Weight", "Low", "Base", "High"];
    doc.setFillColor(230, 230, 230);
    doc.rect(m, y - 3, usable, 5, "F");
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60);
    tLabels.forEach(function (lbl, i) { doc.text(lbl, tCols[i] + 2, y); });
    y += 4;
    // Data rows
    doc.setFont("helvetica", "normal");
    doc.setTextColor(17);
    result.methods.forEach(function (mt, i) {
      if (i % 2 === 0) {
        doc.setFillColor(248, 248, 248);
        doc.rect(m, y - 3, usable, 5, "F");
      }
      doc.setFontSize(7);
      doc.text(mt.name, tCols[0] + 2, y);
      doc.text(Math.round(mt.weight * 100) + "%", tCols[1] + 2, y);
      doc.text(formatMoney(mt.low, geo), tCols[2] + 2, y);
      doc.text(formatMoney(mt.base, geo), tCols[3] + 2, y);
      doc.text(formatMoney(mt.high, geo), tCols[4] + 2, y);
      y += 5;
    });
    y += 6;

    // ── 6. Top Valuation Drivers ──
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17);
    doc.text("TOP VALUATION DRIVERS", m, y);
    y += 5;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60);
    var driversToPrint = result.drivers.slice(0, 5);
    driversToPrint.forEach(function (d) {
      doc.text("\u2022  " + d, m + 2, y);
      y += 4;
    });
    y += 5;

    // ── 7. Public Company Comps (growth-stage only) ──
    if (inputs.stage === "growth" && PUBLIC_COMPS[inputs.sector]) {
      var comps = PUBLIC_COMPS[inputs.sector];
      var maxEV = Math.max.apply(null, comps.map(function (c) { return c.evRev; }));
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(17);
      doc.text("PUBLIC COMPANY COMPS", m, y);
      y += 5;
      // Header
      doc.setFillColor(230, 230, 230);
      doc.rect(m, y - 3, usable, 5, "F");
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(60);
      doc.text("Company", m + 2, y);
      doc.text("Ticker", m + 40, y);
      doc.text("EV/Revenue", m + 62, y);
      y += 4;
      // Rows with bars
      doc.setFont("helvetica", "normal");
      doc.setTextColor(17);
      var barMaxW = 50;
      comps.forEach(function (comp, i) {
        if (i % 2 === 0) {
          doc.setFillColor(248, 248, 248);
          doc.rect(m, y - 3.5, usable, 6, "F");
        }
        doc.setFontSize(7);
        doc.text(comp.name, m + 2, y);
        doc.text(comp.ticker, m + 40, y);
        doc.text(comp.evRev.toFixed(1) + "x", m + 62, y);
        // Inline bar
        var barW = (comp.evRev / maxEV) * barMaxW;
        doc.setFillColor(200, 210, 220);
        doc.rect(m + 82, y - 3, barW, 4, "F");
        y += 6;
      });
      y += 5;
    }

    // ── 8. Cap Table Summary ──
    if (inputs.founderOwnership > 0 && inputs.raiseTarget > 0) {
      var premoney = result.range.base;
      var raise = inputs.raiseTarget;
      var postmoney = premoney + raise;
      var newPct = (raise / postmoney) * 100;
      var dil = newPct / 100;
      var capData = [
        { label: "Founders", pct: inputs.founderOwnership * (1 - dil), val: postmoney * inputs.founderOwnership * (1 - dil) / 100 },
        { label: "ESOP", pct: inputs.esopPool * (1 - dil), val: postmoney * inputs.esopPool * (1 - dil) / 100 },
        { label: "Existing", pct: inputs.existingInvestor * (1 - dil), val: postmoney * inputs.existingInvestor * (1 - dil) / 100 },
        { label: "New Investor", pct: newPct, val: raise },
      ];
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(17);
      doc.text("CAP TABLE \u2014 POST-ROUND", m, y);
      y += 5;
      var boxW = (usable - 9) / 4;
      capData.forEach(function (cd, i) {
        var bx = m + i * (boxW + 3);
        doc.setDrawColor(200);
        doc.setLineWidth(0.3);
        doc.rect(bx, y, boxW, 14, "S");
        // Label
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(120);
        doc.text(cd.label, bx + boxW / 2, y + 4, { align: "center" });
        // Percentage
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(17);
        doc.text(cd.pct.toFixed(1) + "%", bx + boxW / 2, y + 9.5, { align: "center" });
        // Dollar value
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.text(formatMoney(cd.val, geo), bx + boxW / 2, y + 13, { align: "center" });
      });
      y += 18;
    }

    // ── 9. Footer ──
    doc.setDrawColor(180);
    doc.setLineWidth(0.3);
    doc.line(m, 282, pw - m, 282);
    doc.setFontSize(6);
    doc.setTextColor(140);
    doc.setFont("helvetica", "normal");
    doc.text("The VC Corner | thevc.corner@email.com", m, 286);
    doc.text("For decision-support only. Not investment advice. Benchmarks as of Mar 2026.", pw - m, 286, { align: "right" });

    var filename = safeFilename(inputs.companyName || "startup") + "_valuation_report.pdf";
    doc.save(filename);
  }


  /* ══════════════════════════════════════════════════════════════
     EXCEL EXPORT — ExcelJS
     ══════════════════════════════════════════════════════════════ */
  function downloadExcelModel(inputs, result) {
    if (typeof ExcelJS === "undefined") {
      alert("Excel library not loaded. Please check your internet connection.");
      return;
    }

    var wb = new ExcelJS.Workbook();
    wb.creator = "The VC Corner \u2014 Founder Valuation Studio";
    wb.created = new Date();

    var NAVY = "FF0D1B2A";
    var DARK_BG = "FF1B2838";
    var BLUE_FNT = "FF2155CD";
    var BLK = "FF111111";
    var GREY_TXT = "FF777777";
    var LIGHT_GRY = "FFF5F5F5";
    var SECTION_BG = "FFEDF2F7";

    function navyFill() { return { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } }; }
    function darkFill() { return { type: "pattern", pattern: "solid", fgColor: { argb: DARK_BG } }; }
    function lightFill() { return { type: "pattern", pattern: "solid", fgColor: { argb: LIGHT_GRY } }; }
    function sectionFillBg() { return { type: "pattern", pattern: "solid", fgColor: { argb: SECTION_BG } }; }
    function wFont(b, sz) { return { bold: !!b, color: { argb: "FFFFFFFF" }, size: sz || 11, name: "Calibri" }; }
    function bFont(b, sz) { return { bold: !!b, color: { argb: BLUE_FNT }, size: sz || 11, name: "Calibri" }; }
    function kFont(b, sz) { return { bold: !!b, color: { argb: BLK }, size: sz || 11, name: "Calibri" }; }
    function gFont(sz) { return { bold: false, color: { argb: GREY_TXT }, size: sz || 11, name: "Calibri" }; }
    function dFont(b, sz) { return { bold: !!b, size: sz || 11, name: "Calibri" }; }
    var moneyFmt = '$#,##0.0"M"';

    function noGrid(s) { s.views = [{ showGridLines: false }]; s.properties.defaultRowHeight = 18; }
    function setCols(s, w) { w.forEach(function (v, i) { s.getColumn(i + 1).width = v; }); }
    function bandRow(s, r, cols) {
      for (var c = 1; c <= cols; c++) s.getRow(r).getCell(c).fill = navyFill();
    }

    var geo = inputs.geography;

    var DARK_GREY = "FF2D2D2D";
    var BEAR_BG = "FFFDECEA";
    var BULL_BG = "FFE8F5E9";
    function darkGreyFill() { return { type: "pattern", pattern: "solid", fgColor: { argb: DARK_GREY } }; }
    function bearFill() { return { type: "pattern", pattern: "solid", fgColor: { argb: BEAR_BG } }; }
    function bullFill() { return { type: "pattern", pattern: "solid", fgColor: { argb: BULL_BG } }; }
    function greyValFill() { return { type: "pattern", pattern: "solid", fgColor: { argb: "FFE8E8E8" } }; }
    function thinBorder() {
      return { top: { style: "thin", color: { argb: "FFCCCCCC" } }, bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
        left: { style: "thin", color: { argb: "FFCCCCCC" } }, right: { style: "thin", color: { argb: "FFCCCCCC" } } };
    }

    // ═══ COVER — dark header band ═══
    var cover = wb.addWorksheet("Cover", { properties: { tabColor: { argb: DARK_GREY } } });
    noGrid(cover);
    setCols(cover, [4, 50, 30, 4]);
    // Dark header band rows 1-6
    for (var cr = 1; cr <= 6; cr++) {
      for (var cc = 1; cc <= 4; cc++) cover.getRow(cr).getCell(cc).fill = darkGreyFill();
    }
    cover.getRow(1).height = 8;
    cover.getRow(2).getCell(2).value = "THE VC CORNER";
    cover.getRow(2).getCell(2).font = wFont(true, 18);
    cover.getRow(2).height = 30;
    cover.getRow(3).getCell(2).value = "Founder Valuation Studio";
    cover.getRow(3).getCell(2).font = { bold: false, color: { argb: "FFCCCCCC" }, size: 12, name: "Calibri" };
    cover.getRow(3).height = 20;
    cover.getRow(4).height = 8;
    cover.getRow(5).getCell(2).value = inputs.companyName;
    cover.getRow(5).getCell(2).font = wFont(true, 14);
    cover.getRow(5).height = 24;
    cover.getRow(6).getCell(2).value = titleCase(inputs.stage) + " | " + inputs.sector + " | " + geo;
    cover.getRow(6).getCell(2).font = { bold: false, color: { argb: "FFAAAAAA" }, size: 11, name: "Calibri" };
    cover.getRow(6).height = 20;

    // Row 7: Generated date
    cover.getRow(7).getCell(2).value = "Generated: " + formatDate(result.timestamp);
    cover.getRow(7).getCell(2).font = gFont(10);
    cover.getRow(7).height = 18;

    // Row 8: Valuation range labels, Row 9: values
    cover.getRow(8).height = 18;
    ["Low", "Base", "High"].forEach(function (l, i) {
      cover.getRow(8).getCell(2 + i).value = l;
      cover.getRow(8).getCell(2 + i).font = gFont(10);
    });
    [result.range.low, result.range.base, result.range.high].forEach(function (v, i) {
      var cell = cover.getRow(9).getCell(2 + i);
      cell.value = v;
      cell.numFmt = moneyFmt;
      cell.font = kFont(true, 13);
      cell.fill = greyValFill();
      cell.border = thinBorder();
    });
    cover.getRow(9).height = 24;

    // Quality signals
    var cvy = 11;
    if (result.qualitySignals.rule40) {
      cover.getRow(cvy).getCell(2).value = "Rule of 40";
      cover.getRow(cvy).getCell(2).font = gFont(11);
      cover.getRow(cvy).getCell(3).value = result.qualitySignals.rule40.score + "% (" + result.qualitySignals.rule40.grade + ")";
      cover.getRow(cvy).getCell(3).font = bFont(false, 11);
      cover.getRow(cvy).height = 18;
      cvy++;
    }
    if (result.qualitySignals.unitEcon) {
      cover.getRow(cvy).getCell(2).value = "LTV/CAC";
      cover.getRow(cvy).getCell(2).font = gFont(11);
      cover.getRow(cvy).getCell(3).value = result.qualitySignals.unitEcon.ltvCac.toFixed(1) + "x (" + result.qualitySignals.unitEcon.grade + ")";
      cover.getRow(cvy).getCell(3).font = bFont(false, 11);
      cover.getRow(cvy).height = 18;
      cvy++;
    }
    cvy++;
    cover.getRow(cvy).getCell(2).value = "Benchmark assumptions last updated: " + result.assumptionsDate;
    cover.getRow(cvy).getCell(2).font = gFont(9);
    cvy += 2;
    cover.getRow(cvy).getCell(2).value = "For decision-support only. Not investment advice. Benchmarks are static model assumptions.";
    cover.getRow(cvy).getCell(2).font = gFont(9);

    // ═══ EXECUTIVE SUMMARY ═══
    var es = wb.addWorksheet("Executive Summary");
    noGrid(es);
    setCols(es, [3, 24, 18, 18, 18, 3]);
    bandRow(es, 1, 6); bandRow(es, 2, 6);
    es.getRow(2).getCell(2).value = "Executive Summary";
    es.getRow(2).getCell(2).font = wFont(true, 14);
    es.getRow(2).height = 28;
    es.getRow(3).getCell(2).value = inputs.companyName;
    es.getRow(3).getCell(2).font = dFont(true, 11);

    es.getRow(5).getCell(2).value = "Valuation Range";
    es.getRow(5).getCell(2).font = kFont(true, 13);
    ["Low", "Base", "High"].forEach(function (l, i) {
      es.getRow(6).getCell(3 + i).value = l;
      es.getRow(6).getCell(3 + i).font = gFont(10);
    });
    var r7 = es.getRow(7);
    r7.getCell(2).value = "Pre-money ($M)"; r7.getCell(2).font = kFont(false);
    r7.getCell(3).value = result.range.low; r7.getCell(3).font = kFont(true, 12); r7.getCell(3).numFmt = moneyFmt;
    r7.getCell(4).value = result.range.base; r7.getCell(4).font = kFont(true, 12); r7.getCell(4).numFmt = moneyFmt;
    r7.getCell(5).value = result.range.high; r7.getCell(5).font = kFont(true, 12); r7.getCell(5).numFmt = moneyFmt;
    r7.height = 22;

    es.getRow(9).getCell(2).value = "Method Weights";
    es.getRow(9).getCell(2).font = kFont(true, 13);
    var mwH = es.getRow(10);
    ["Method", "Weight", "Base ($M)"].forEach(function (l, i) {
      mwH.getCell(i + 2).value = l; mwH.getCell(i + 2).font = wFont(true); mwH.getCell(i + 2).fill = darkFill();
    });
    mwH.height = 20;

    var esy = 11;
    result.methods.forEach(function (mt, i) {
      var row = es.getRow(esy);
      if (i % 2 === 0) { for (var c = 2; c <= 4; c++) row.getCell(c).fill = lightFill(); }
      row.getCell(2).value = mt.name; row.getCell(2).font = kFont(false);
      row.getCell(3).value = mt.weight; row.getCell(3).font = kFont(false); row.getCell(3).numFmt = "0%";
      row.getCell(4).value = mt.base; row.getCell(4).font = kFont(false); row.getCell(4).numFmt = moneyFmt;
      esy++;
    });
    var bRow = es.getRow(esy);
    bRow.getCell(2).value = "Blended"; bRow.getCell(2).font = kFont(true);
    bRow.getCell(3).value = 1; bRow.getCell(3).font = kFont(true); bRow.getCell(3).numFmt = "0%";
    bRow.getCell(4).value = result.range.base; bRow.getCell(4).font = kFont(true); bRow.getCell(4).numFmt = moneyFmt;
    for (var bc = 2; bc <= 4; bc++) bRow.getCell(bc).border = { top: { style: "medium", color: { argb: BLK } } };
    esy += 2;

    es.getRow(esy).getCell(2).value = "Key Drivers";
    es.getRow(esy).getCell(2).font = kFont(true, 13);
    esy++;
    result.drivers.forEach(function (d) {
      es.getRow(esy).getCell(2).value = "\u2022  " + d;
      es.getRow(esy).getCell(2).font = kFont(true, 10);
      es.getRow(esy).height = 18;
      esy++;
    });

    // ═══ INPUTS ═══
    var inp = wb.addWorksheet("Inputs");
    noGrid(inp);
    setCols(inp, [3, 36, 22, 3]);
    bandRow(inp, 1, 4); bandRow(inp, 2, 4);
    inp.getRow(2).getCell(2).value = "Model Inputs";
    inp.getRow(2).getCell(2).font = wFont(true, 14);
    inp.getRow(2).height = 28;

    var iy = 4;
    function addSec(t) { inp.getRow(iy).getCell(2).value = t; inp.getRow(iy).getCell(2).font = dFont(true, 12); iy++; }
    function addInp(l, v, f) {
      var row = inp.getRow(iy);
      row.getCell(2).value = l; row.getCell(2).font = gFont(11);
      row.getCell(3).value = v; row.getCell(3).font = bFont(false, 11);
      if (f) row.getCell(3).numFmt = f;
      iy++;
    }

    addSec("Company Profile");
    addInp("Company Name", inputs.companyName);
    addInp("Stage", titleCase(inputs.stage));
    addInp("Sector", inputs.sector);
    addInp("Geography", geo);
    addInp("Business Model", inputs.businessModel);
    addInp("Founding Year", inputs.foundingYear, "0");
    addInp("AI-Integrated", inputs.aiIntegrated === "yes" ? "Yes" : "No");
    if (inputs.mode === "deep") {
      addInp("IP Portfolio", titleCase(inputs.ipPortfolio));
      addInp("Strategic Partnerships", titleCase(inputs.strategicPartnerships));
    }
    iy++;

    addSec("Financials & Traction");
    if (inputs.stage === "pre-revenue") {
      addInp("Product Stage", titleCase(inputs.productStage));
      addInp("Early Users", inputs.earlyUsers, "#,##0");
      if (inputs.teamSize > 0) addInp("Team Size", inputs.teamSize, "0");
      if (inputs.devMonths > 0) addInp("Dev Months", inputs.devMonths, "0");
      addInp("Tech Complexity (1-5)", inputs.techComplexity, "0");
      addInp("IP/Patents", inputs.ipPatents === "yes" ? "Yes" : "No");
    } else {
      addInp("Revenue Run-rate ($M)", inputs.revenueRunRate, moneyFmt);
      addInp("Annual Growth", inputs.growthRate / 100, "0%");
      addInp("Gross Margin", inputs.grossMargin / 100, "0%");
      addInp("Active Customers", inputs.customerCount, "#,##0");
      addInp("CAC", inputs.cac, "$#,##0");
      addInp("LTV", inputs.ltv, "$#,##0");
      addInp("Annual Churn", inputs.churn / 100, "0%");
      if (inputs.mode === "deep") {
        addInp("Net Revenue Retention", inputs.nrr / 100, "0%");
        addInp("Burn Multiple", inputs.burnMultiple, '0.0"x"');
      }
    }
    if (inputs.compDeals.length > 0) {
      iy++;
      addSec("Comparable Transactions");
      inputs.compDeals.forEach(function (deal, idx) {
        addInp("Comp " + (idx + 1), deal.name + " - " + formatMoney(deal.valuation, geo));
      });
    }
    iy++;

    addSec("Market & Risk");
    addInp("TAM ($M)", inputs.tam, '$#,##0"M"');
    addInp("Competition Intensity (1-5)", inputs.competitionIntensity, "0");
    addInp("Moat Strength (1-5)", inputs.moatStrength, "0");
    addInp("Founder Experience (1-5)", inputs.founderExperience, "0");
    addInp("Concentration Risk (1-5)", inputs.concentrationRisk, "0");
    addInp("Regulatory Risk (1-5)", inputs.regulatoryRisk, "0");
    if (inputs.mode === "deep") {
      addInp("Team Completeness (1-5)", inputs.teamCompleteness, "0");
      addInp("Business Plan Quality (1-5)", inputs.bizPlanQuality, "0");
    }
    iy++;

    addSec("Fundraise & Projections");
    addInp("Target Raise ($M)", inputs.raiseTarget, moneyFmt);
    addInp("Runway (months)", inputs.runwayMonths, "0");
    addInp("Target Dilution", inputs.targetDilution / 100, "0%");
    addInp("Founder Ownership", inputs.founderOwnership / 100, "0%");
    addInp("ESOP Pool", inputs.esopPool / 100, "0%");
    addInp("Existing Investor", inputs.existingInvestor / 100, "0%");
    if (inputs.mode === "deep") {
      addInp("Pipeline Coverage", inputs.pipelineCoverage, '0.0"x"');
      addInp("Projected 3Y CAGR", inputs.projectedCagr / 100, "0%");
    }

    // ═══ METHODS ═══
    var mth = wb.addWorksheet("Methods");
    noGrid(mth);
    setCols(mth, [3, 28, 14, 18, 18, 18, 3]);
    bandRow(mth, 1, 7); bandRow(mth, 2, 7);
    mth.getRow(2).getCell(2).value = "Valuation Methods";
    mth.getRow(2).getCell(2).font = wFont(true, 14);
    mth.getRow(2).height = 28;

    var mhR = mth.getRow(4);
    ["Method", "Weight", "Low ($M)", "Base ($M)", "High ($M)"].forEach(function (l, i) {
      mhR.getCell(i + 2).value = l; mhR.getCell(i + 2).font = dFont(true, 11);
    });

    var my = 5;
    result.methods.forEach(function (mt) {
      var row = mth.getRow(my);
      row.getCell(2).value = mt.name; row.getCell(2).font = kFont(false);
      row.getCell(3).value = mt.weight; row.getCell(3).font = kFont(false); row.getCell(3).numFmt = "0%";
      row.getCell(4).value = mt.low; row.getCell(4).font = kFont(false); row.getCell(4).numFmt = moneyFmt;
      row.getCell(5).value = mt.base; row.getCell(5).font = kFont(false); row.getCell(5).numFmt = moneyFmt;
      row.getCell(6).value = mt.high; row.getCell(6).font = kFont(false); row.getCell(6).numFmt = moneyFmt;
      row.height = 20;
      my++;
    });
    var mbR = mth.getRow(my);
    mbR.getCell(2).value = "Blended"; mbR.getCell(2).font = kFont(true);
    mbR.getCell(3).value = 1; mbR.getCell(3).font = kFont(true); mbR.getCell(3).numFmt = "0%";
    mbR.getCell(4).value = result.range.low; mbR.getCell(4).font = kFont(true); mbR.getCell(4).numFmt = moneyFmt;
    mbR.getCell(5).value = result.range.base; mbR.getCell(5).font = kFont(true); mbR.getCell(5).numFmt = moneyFmt;
    mbR.getCell(6).value = result.range.high; mbR.getCell(6).font = kFont(true); mbR.getCell(6).numFmt = moneyFmt;
    for (var mc = 2; mc <= 6; mc++) mbR.getCell(mc).border = { top: { style: "medium", color: { argb: BLK } } };
    mbR.height = 22;

    // Quality signals in Methods sheet
    my += 2;
    if (result.qualitySignals.rule40 || result.qualitySignals.unitEcon || result.qualitySignals.aiPremium) {
      mth.getRow(my).getCell(2).value = "Quality Signals";
      mth.getRow(my).getCell(2).font = kFont(true, 13);
      my++;
      if (result.qualitySignals.rule40) {
        mth.getRow(my).getCell(2).value = "Rule of 40"; mth.getRow(my).getCell(2).font = gFont(11);
        mth.getRow(my).getCell(3).value = result.qualitySignals.rule40.score + "% (" + result.qualitySignals.rule40.grade + ")";
        mth.getRow(my).getCell(3).font = kFont(false); my++;
      }
      if (result.qualitySignals.unitEcon) {
        mth.getRow(my).getCell(2).value = "LTV/CAC"; mth.getRow(my).getCell(2).font = gFont(11);
        mth.getRow(my).getCell(3).value = result.qualitySignals.unitEcon.ltvCac.toFixed(1) + "x (" + result.qualitySignals.unitEcon.grade + ")";
        mth.getRow(my).getCell(3).font = kFont(false); my++;
      }
      if (result.qualitySignals.aiPremium) {
        mth.getRow(my).getCell(2).value = "AI Premium"; mth.getRow(my).getCell(2).font = gFont(11);
        mth.getRow(my).getCell(3).value = "+17.5% on revenue multiples";
        mth.getRow(my).getCell(3).font = kFont(false); my++;
      }
    }

    // ═══ SCENARIOS ═══
    var sc = wb.addWorksheet("Scenarios");
    noGrid(sc);
    setCols(sc, [3, 32, 18, 18, 18, 3]);
    bandRow(sc, 1, 6); bandRow(sc, 2, 6);
    sc.getRow(2).getCell(2).value = "Scenario Analysis";
    sc.getRow(2).getCell(2).font = wFont(true, 14);
    sc.getRow(2).height = 28;

    sc.getRow(4).getCell(2).value = "Sensitivity Adjustments";
    sc.getRow(4).getCell(2).font = dFont(true, 12);

    [
      ["Growth Shift", state.sensitivity.growth / 100],
      ["Multiple Shift", state.sensitivity.multiple / 100],
      ["Discount Rate Shift", state.sensitivity.discount / 100],
    ].forEach(function (p, i) {
      var row = sc.getRow(5 + i);
      row.getCell(2).value = p[0]; row.getCell(2).font = gFont(11);
      row.getCell(3).value = p[1]; row.getCell(3).font = bFont(false, 11); row.getCell(3).numFmt = "0%";
    });

    sc.getRow(9).getCell(2).value = "Resulting Valuation";
    sc.getRow(9).getCell(2).font = kFont(true, 12);
    sc.getRow(9).getCell(2).fill = sectionFillBg();

    var scHR = sc.getRow(10);
    ["Scenario", "Low ($M)", "Base ($M)", "High ($M)"].forEach(function (l, i) {
      scHR.getCell(i + 2).value = l; scHR.getCell(i + 2).font = dFont(true, 11);
    });

    var scenarioFills = [bearFill, null, bullFill];
    [
      ["Bear Case", result.range.low * 0.85, result.range.base * 0.85, result.range.high * 0.85, false],
      ["Base Case", result.range.low, result.range.base, result.range.high, true],
      ["Bull Case", result.range.low * 1.18, result.range.base * 1.18, result.range.high * 1.18, false],
    ].forEach(function (s, i) {
      var row = sc.getRow(11 + i);
      var bold = s[4];
      row.getCell(2).value = s[0]; row.getCell(2).font = kFont(bold);
      row.getCell(3).value = s[1]; row.getCell(3).font = kFont(bold); row.getCell(3).numFmt = moneyFmt;
      row.getCell(4).value = s[2]; row.getCell(4).font = kFont(bold); row.getCell(4).numFmt = moneyFmt;
      row.getCell(5).value = s[3]; row.getCell(5).font = kFont(bold); row.getCell(5).numFmt = moneyFmt;
      // Color-coded scenario rows
      if (scenarioFills[i]) {
        for (var sc2 = 2; sc2 <= 5; sc2++) row.getCell(sc2).fill = scenarioFills[i]();
      }
    });

    // Cap table in scenarios sheet
    if (inputs.founderOwnership > 0 && inputs.raiseTarget > 0) {
      var scy = 16;
      sc.getRow(scy).getCell(2).value = "Cap Table (at base valuation)";
      sc.getRow(scy).getCell(2).font = kFont(true, 12);
      scy++;
      var pm = result.range.base;
      var ra = inputs.raiseTarget;
      var pom = pm + ra;
      var nip = (ra / pom) * 100;
      var dd = nip / 100;
      [
        ["Post-money", formatMoney(pom, geo)],
        ["New Investor %", nip.toFixed(1) + "%"],
        ["Founders (post)", (inputs.founderOwnership * (1 - dd)).toFixed(1) + "%"],
        ["ESOP (post)", (inputs.esopPool * (1 - dd)).toFixed(1) + "%"],
        ["Existing (post)", (inputs.existingInvestor * (1 - dd)).toFixed(1) + "%"],
      ].forEach(function (r) {
        sc.getRow(scy).getCell(2).value = r[0]; sc.getRow(scy).getCell(2).font = gFont(11);
        sc.getRow(scy).getCell(3).value = r[1]; sc.getRow(scy).getCell(3).font = kFont(false);
        scy++;
      });
    }

    // ═══ CAP TABLE SHEET ═══
    if (inputs.founderOwnership > 0 && inputs.raiseTarget > 0) {
      var ct = wb.addWorksheet("Cap Table");
      noGrid(ct);
      setCols(ct, [3, 28, 18, 18, 3]);
      bandRow(ct, 1, 5); bandRow(ct, 2, 5);
      ct.getRow(2).getCell(2).value = "Cap Table \u2014 Post-Round Ownership";
      ct.getRow(2).getCell(2).font = wFont(true, 14);
      ct.getRow(2).height = 28;

      var ctPM = result.range.base;
      var ctRA = inputs.raiseTarget;
      var ctPOM = ctPM + ctRA;
      var ctNIP = (ctRA / ctPOM) * 100;
      var ctDD = ctNIP / 100;

      // Table header
      var ctHR = ct.getRow(4);
      ["Stakeholder", "Ownership %", "Value ($M)"].forEach(function (l, i) {
        ctHR.getCell(i + 2).value = l; ctHR.getCell(i + 2).font = wFont(true); ctHR.getCell(i + 2).fill = darkFill();
      });
      ctHR.height = 20;

      var ctRows = [
        ["Founders", inputs.founderOwnership * (1 - ctDD), ctPOM * inputs.founderOwnership * (1 - ctDD) / 100],
        ["ESOP Pool", inputs.esopPool * (1 - ctDD), ctPOM * inputs.esopPool * (1 - ctDD) / 100],
        ["Existing Investors", inputs.existingInvestor * (1 - ctDD), ctPOM * inputs.existingInvestor * (1 - ctDD) / 100],
        ["New Investor", ctNIP, ctRA],
      ];
      var ctY = 5;
      ctRows.forEach(function (r, i) {
        var row = ct.getRow(ctY);
        if (i % 2 === 0) { for (var c = 2; c <= 4; c++) row.getCell(c).fill = lightFill(); }
        row.getCell(2).value = r[0]; row.getCell(2).font = kFont(false);
        row.getCell(3).value = r[1] / 100; row.getCell(3).font = kFont(false); row.getCell(3).numFmt = "0.0%";
        row.getCell(4).value = r[2]; row.getCell(4).font = kFont(false); row.getCell(4).numFmt = moneyFmt;
        row.getCell(2).border = thinBorder(); row.getCell(3).border = thinBorder(); row.getCell(4).border = thinBorder();
        row.height = 18;
        ctY++;
      });
      // Total row
      var ctTotal = ct.getRow(ctY);
      ctTotal.getCell(2).value = "Total"; ctTotal.getCell(2).font = kFont(true);
      ctTotal.getCell(3).value = 1; ctTotal.getCell(3).font = kFont(true); ctTotal.getCell(3).numFmt = "0.0%";
      ctTotal.getCell(4).value = ctPOM; ctTotal.getCell(4).font = kFont(true); ctTotal.getCell(4).numFmt = moneyFmt;
      for (var tc = 2; tc <= 4; tc++) ctTotal.getCell(tc).border = { top: { style: "medium", color: { argb: BLK } } };
      ctTotal.height = 20;

      // Embed doughnut chart image if available
      try {
        var captableCanvas = document.querySelector("#captableChart");
        if (captableCanvas) {
          var ctImg = captableCanvas.toDataURL("image/png");
          var ctImgId = wb.addImage({ base64: ctImg.split(",")[1], extension: "png" });
          ct.addImage(ctImgId, { tl: { col: 1, row: ctY + 1 }, ext: { width: 340, height: 280 } });
        }
      } catch (e) { /* skip chart image on error */ }
    }

    // ═══ Chart images on Executive Summary ═══
    try {
      var methodCanvas = document.querySelector("#methodChart");
      var rangeCanvas = document.querySelector("#rangeChart");
      if (methodCanvas) {
        var mImg = methodCanvas.toDataURL("image/png");
        var mImgId = wb.addImage({ base64: mImg.split(",")[1], extension: "png" });
        es.addImage(mImgId, { tl: { col: 1, row: esy + 1 }, ext: { width: 380, height: 260 } });
      }
      if (rangeCanvas) {
        var rImg = rangeCanvas.toDataURL("image/png");
        var rImgId = wb.addImage({ base64: rImg.split(",")[1], extension: "png" });
        es.addImage(rImgId, { tl: { col: 1, row: esy + 16 }, ext: { width: 380, height: 260 } });
      }
    } catch (e) { /* skip chart images on error */ }

    // Generate and download
    wb.xlsx.writeBuffer().then(function (buffer) {
      var blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      var filename = safeFilename(inputs.companyName || "startup") + "_valuation_model.xlsx";
      triggerDownload(blob, filename);
    });
  }


  /* ══════════════════════════════════════════════════════════════
     UTILITY FUNCTIONS
     ══════════════════════════════════════════════════════════════ */
  function getBench(inputs) {
    return BENCHMARKS[inputs.geography][inputs.sector];
  }

  function scoreFromCustomers(count) {
    if (count >= 500) return 5;
    if (count >= 200) return 4;
    if (count >= 80) return 3;
    if (count >= 20) return 2;
    return 1;
  }

  function scoreFromTam(tamMillions) {
    if (tamMillions >= 10000) return 5;
    if (tamMillions >= 4000) return 4;
    if (tamMillions >= 1500) return 3;
    if (tamMillions >= 500) return 2;
    return 1;
  }

  function toMoneyMillions(value) {
    var raw = String(value || "0").replace(/[^0-9.\-]/g, "");
    var n = parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n / 1000000 : 0;
  }

  function toNumber(value, fallback) {
    var raw = String(value || "").replace(/[^0-9.\-]/g, "");
    var n = Number(raw);
    return Number.isFinite(n) ? n : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function scale(value, inMin, inMax, outMin, outMax) {
    var ratio = (value - inMin) / (inMax - inMin);
    return outMin + clamp(ratio, 0, 1) * (outMax - outMin);
  }

  function roundNum(value, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }

  function formatMoney(millions, geography) {
    var symbol = CURRENCY_MAP[geography] || "$";
    if (millions >= 1000) return symbol + (millions / 1000).toFixed(2) + "B";
    return symbol + millions.toFixed(2) + "M";
  }

  function formatNumberCommas(n) {
    var parts = n.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  function titleCase(value) {
    return String(value)
      .replace(/-/g, " ")
      .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function formatDate(date) {
    return date.toLocaleString(undefined, {
      year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit",
    });
  }

  function safeFilename(value) {
    return String(value).trim().replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").slice(0, 60);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function triggerDownload(blob, filename) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 500);
  }

})();
