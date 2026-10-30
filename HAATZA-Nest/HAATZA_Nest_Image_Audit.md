# HAATZA Nest Image Asset Audit Report

> **Audit Mode**: Read-Only Inspection  
> **Target Workspace**: `HAATZA-Nest`  
> **Auditor**: Senior React + TypeScript Project Auditor  
> **Date**: October 2026  

---

## Executive Summary

A thorough, deep-trace asset audit was conducted across the entire **HAATZA Nest** codebase. A total of **126 image assets** across `public/` and `src/assets/` were scanned, cataloged, and audited against all JSX/TSX components, TypeScript data files, HTML templates, and CSS stylesheets.

### Key Audit Metrics

| Audit Classification | Count | Percentage | Total Storage Size | Storage % |
|:----------------------|:------|:-----------|:-------------------|:----------|
| **A. Confirmed Used Images** | **41** | 32.5% | 13.59 MB | 42.9% |
| **B. Potentially Unused Images** | **27** | 21.4% | 4.90 MB | 15.5% |
| **C. Duplicate & Near-Duplicate Images** | **56** | 44.4% | 12.81 MB | 40.4% |
| **D. Uncertain Assets** | **2** | 1.6% | 406.3 KB | 1.3% |
| **Total Image Assets Scanned** | **126** | **100.0%** | **31.70 MB** | **100.0%** |

---

## Category A: Confirmed Used Images

These assets are explicitly imported or referenced in the production source code and bundled during the Vite build process.

| # | Relative Path | Filename | Format | Dimensions | File Size | Primary Code Reference | Classification Rationale |
|---|---------------|----------|--------|------------|-----------|------------------------|--------------------------|
| 1 | `public/favicon.svg` | `favicon.svg` | SVG | N/A | 213 B | `index.html:5` | Explicitly imported/referenced in 1 location(s), including `index.html:5`. |
| 2 | `public/images/app-store-badge.svg` | `app-store-badge.svg` | SVG | N/A | 12.1 KB | `src/components/HaatzaNestFooter/HaatzaNestFooter.tsx:4` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestFooter/HaatzaNestFooter.tsx:4`. |
| 3 | `public/images/google-play-badge.svg` | `google-play-badge.svg` | SVG | N/A | 7.0 KB | `src/components/HaatzaNestFooter/HaatzaNestFooter.tsx:3` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestFooter/HaatzaNestFooter.tsx:3`. |
| 4 | `public/images/haatza-nest-namaste-pro.jpg` | `haatza-nest-namaste-pro.jpg` | JPG | 1024x935 | 90.0 KB | `src/pages/HaatzaNestHome/HaatzaNestHomePage.tsx:25` | Explicitly imported/referenced in 1 location(s), including `src/pages/HaatzaNestHome/HaatzaNestHomePage.tsx:25`. |
| 5 | `public/images/haatza-pure-banner-kitchen.png` | `haatza-pure-banner-kitchen.png` | PNG | 1024x400 | 457.0 KB | `src/pages/HaatzaNestHome/HaatzaNestHomePage.tsx:20` | Explicitly imported/referenced in 1 location(s), including `src/pages/HaatzaNestHome/HaatzaNestHomePage.tsx:20`. |
| 6 | `public/images/haatza_nest_logo.png` | `haatza_nest_logo.png` | PNG | 984x144 | 45.3 KB | `src/components/HaatzaNestHeader/HaatzaNestLogo.tsx:3` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestHeader/HaatzaNestLogo.tsx:3`. |
| 7 | `public/images/services/bathroom-cleaning.jpg` | `bathroom-cleaning.jpg` | JPG | 1200x896 | 546.2 KB | `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:11` | Explicitly imported/referenced in 3 location(s), including `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:11`. |
| 8 | `public/images/services/dishwashing.jpg` | `dishwashing.jpg` | JPG | 1200x896 | 567.8 KB | `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:9` | Explicitly imported/referenced in 4 location(s), including `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:9`. |
| 9 | `public/images/services/dusting-wiping.jpg` | `dusting-wiping.jpg` | JPG | 1200x896 | 608.8 KB | `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:8` | Explicitly imported/referenced in 2 location(s), including `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:8`. |
| 10 | `public/images/services/house-cleaning.jpg` | `house-cleaning.jpg` | JPG | 1200x896 | 586.4 KB | `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:6` | Explicitly imported/referenced in 3 location(s), including `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:6`. |
| 11 | `public/images/services/kitchen-cleaning.jpg` | `kitchen-cleaning.jpg` | JPG | 1200x896 | 603.8 KB | `src/data/nestData.ts:8` | Explicitly imported/referenced in 1 location(s), including `src/data/nestData.ts:8`. |
| 12 | `public/images/services/laundry-ironing.jpg` | `laundry-ironing.jpg` | JPG | 1200x896 | 588.9 KB | `src/data/nestData.ts:12` | Explicitly imported/referenced in 2 location(s), including `src/data/nestData.ts:12`. |
| 13 | `public/images/services/meal-prep.jpg` | `meal-prep.jpg` | JPG | 1200x896 | 618.2 KB | `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:10` | Explicitly imported/referenced in 3 location(s), including `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:10`. |
| 14 | `public/images/services/mopping.jpg` | `mopping.jpg` | JPG | 1200x896 | 587.4 KB | `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:7` | Explicitly imported/referenced in 5 location(s), including `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:7`. |
| 15 | `src/assets/app-store-badge.svg` | `app-store-badge.svg` | SVG | N/A | 12.1 KB | `src/components/HaatzaNestFooter/HaatzaNestFooter.tsx:4` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestFooter/HaatzaNestFooter.tsx:4`. |
| 16 | `src/assets/google-play-badge.svg` | `google-play-badge.svg` | SVG | N/A | 7.0 KB | `src/components/HaatzaNestFooter/HaatzaNestFooter.tsx:3` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestFooter/HaatzaNestFooter.tsx:3`. |
| 17 | `src/assets/haatza-nest-namaste-pro.jpg` | `haatza-nest-namaste-pro.jpg` | JPG | 1024x935 | 90.0 KB | `src/pages/HaatzaNestHome/HaatzaNestHomePage.tsx:25` | Explicitly imported/referenced in 1 location(s), including `src/pages/HaatzaNestHome/HaatzaNestHomePage.tsx:25`. |
| 18 | `src/assets/haatza-pure-banner-kitchen.png` | `haatza-pure-banner-kitchen.png` | PNG | 1024x400 | 457.0 KB | `src/pages/HaatzaNestHome/HaatzaNestHomePage.tsx:20` | Explicitly imported/referenced in 1 location(s), including `src/pages/HaatzaNestHome/HaatzaNestHomePage.tsx:20`. |
| 19 | `src/assets/haatza_3d_calendar_desk_clean_hd.png` | `haatza_3d_calendar_desk_clean_hd.png` | PNG | 1024x750 | 803.7 KB | `src/components/HaatzaNestBooking/HaatzaNestBookingOptionsSection.tsx:4` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestBooking/HaatzaNestBookingOptionsSection.tsx:4`. |
| 20 | `src/assets/haatza_house_help_expert_silhouette.png` | `haatza_house_help_expert_silhouette.png` | PNG | 235x595 | 96.6 KB | `src/pages/HaatzaNestHome/HaatzaNestHomePage.tsx:33` | Explicitly imported/referenced in 1 location(s), including `src/pages/HaatzaNestHome/HaatzaNestHomePage.tsx:33`. |
| 21 | `src/assets/haatza_namaste_pro_clean.png` | `haatza_namaste_pro_clean.png` | PNG | 1024x924 | 566.2 KB | `src/pages/HaatzaNestHome/HaatzaNestHomePage.tsx:24` | Explicitly imported/referenced in 1 location(s), including `src/pages/HaatzaNestHome/HaatzaNestHomePage.tsx:24`. |
| 22 | `src/assets/haatza_namaste_pro_popout.png` | `haatza_namaste_pro_popout.png` | PNG | 580x915 | 505.9 KB | `src/components/HaatzaNestBooking/HaatzaNestBookingOptionsSection.tsx:3` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestBooking/HaatzaNestBookingOptionsSection.tsx:3`. |
| 23 | `src/assets/haatza_nest_hero_banner_mopping.jpg` | `haatza_nest_hero_banner_mopping.jpg` | JPG | 1560x520 | 164.4 KB | `src/components/HaatzaNestHome/HaatzaNestHeroCarousel.tsx:10` | Explicitly imported/referenced in 2 location(s), including `src/components/HaatzaNestHome/HaatzaNestHeroCarousel.tsx:10`. |
| 24 | `src/assets/haatza_nest_hero_banner_official.jpg` | `haatza_nest_hero_banner_official.jpg` | JPG | 1560x520 | 143.6 KB | `src/components/HaatzaNestHome/HaatzaNestHeroCarousel.tsx:9` | Explicitly imported/referenced in 2 location(s), including `src/components/HaatzaNestHome/HaatzaNestHeroCarousel.tsx:9`. |
| 25 | `src/assets/haatza_nest_logo.png` | `haatza_nest_logo.png` | PNG | 984x144 | 45.3 KB | `src/components/HaatzaNestHeader/HaatzaNestLogo.tsx:3` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestHeader/HaatzaNestLogo.tsx:3`. |
| 26 | `src/assets/haatza_nest_referral_group.png` | `haatza_nest_referral_group.png` | PNG | 466x484 | 277.2 KB | `src/components/HaatzaNestReferral/HaatzaNestReferralBanner.tsx:3` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestReferral/HaatzaNestReferralBanner.tsx:3`. |
| 27 | `src/assets/haatza_nest_referral_woman.png` | `haatza_nest_referral_woman.png` | PNG | 514x484 | 276.8 KB | `src/components/HaatzaNestReferral/HaatzaNestReferralBanner.tsx:4` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestReferral/HaatzaNestReferralBanner.tsx:4`. |
| 28 | `src/assets/services/bathroom-cleaning.jpg` | `bathroom-cleaning.jpg` | JPG | 1200x896 | 546.2 KB | `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:11` | Explicitly imported/referenced in 3 location(s), including `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:11`. |
| 29 | `src/assets/services/dishwashing.jpg` | `dishwashing.jpg` | JPG | 1200x896 | 567.8 KB | `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:9` | Explicitly imported/referenced in 4 location(s), including `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:9`. |
| 30 | `src/assets/services/dusting-wiping.jpg` | `dusting-wiping.jpg` | JPG | 1200x896 | 608.8 KB | `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:8` | Explicitly imported/referenced in 2 location(s), including `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:8`. |
| 31 | `src/assets/services/home-cleaning.webp` | `home-cleaning.webp` | WEBP | 896x1200 | 158.6 KB | `src/components/HaatzaNestServices/HaatzaNestExpertServicesGrid.tsx:8` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestServices/HaatzaNestExpertServicesGrid.tsx:8`. |
| 32 | `src/assets/services/house-cleaning.jpg` | `house-cleaning.jpg` | JPG | 1200x896 | 586.4 KB | `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:6` | Explicitly imported/referenced in 3 location(s), including `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:6`. |
| 33 | `src/assets/services/kitchen-cleaning.jpg` | `kitchen-cleaning.jpg` | JPG | 1200x896 | 603.8 KB | `src/data/nestData.ts:8` | Explicitly imported/referenced in 1 location(s), including `src/data/nestData.ts:8`. |
| 34 | `src/assets/services/laundry-ironing.jpg` | `laundry-ironing.jpg` | JPG | 1200x896 | 588.9 KB | `src/data/nestData.ts:12` | Explicitly imported/referenced in 2 location(s), including `src/data/nestData.ts:12`. |
| 35 | `src/assets/services/meal-prep.jpg` | `meal-prep.jpg` | JPG | 1200x896 | 618.2 KB | `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:10` | Explicitly imported/referenced in 3 location(s), including `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:10`. |
| 36 | `src/assets/services/mopping.jpg` | `mopping.jpg` | JPG | 1200x896 | 587.4 KB | `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:7` | Explicitly imported/referenced in 5 location(s), including `src/components/HaatzaNestBooking/HaatzaNestInstantBottomSheet.tsx:7`. |
| 37 | `src/assets/services/nest_bathroom_cleaning.jpg` | `nest_bathroom_cleaning.jpg` | JPG | 288x408 | 48.9 KB | `src/components/HaatzaNestServices/HaatzaNestExpertServicesGrid.tsx:5` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestServices/HaatzaNestExpertServicesGrid.tsx:5`. |
| 38 | `src/assets/services/nest_dishwashing.jpg` | `nest_dishwashing.jpg` | JPG | 288x394 | 57.9 KB | `src/components/HaatzaNestServices/HaatzaNestExpertServicesGrid.tsx:7` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestServices/HaatzaNestExpertServicesGrid.tsx:7`. |
| 39 | `src/assets/services/nest_home_care.jpg` | `nest_home_care.jpg` | JPG | 284x394 | 58.2 KB | `src/components/HaatzaNestServices/HaatzaNestExpertServicesGrid.tsx:9` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestServices/HaatzaNestExpertServicesGrid.tsx:9`. |
| 40 | `src/assets/services/nest_laundry_ironing.jpg` | `nest_laundry_ironing.jpg` | JPG | 284x408 | 52.6 KB | `src/components/HaatzaNestServices/HaatzaNestExpertServicesGrid.tsx:6` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestServices/HaatzaNestExpertServicesGrid.tsx:6`. |
| 41 | `src/assets/services/nest_meal_assistance.jpg` | `nest_meal_assistance.jpg` | JPG | 302x408 | 71.8 KB | `src/components/HaatzaNestServices/HaatzaNestExpertServicesGrid.tsx:4` | Explicitly imported/referenced in 1 location(s), including `src/components/HaatzaNestServices/HaatzaNestExpertServicesGrid.tsx:4`. |

---

## Category B: Potentially Unused Images

These assets have **zero references** across any TypeScript, TSX, CSS, HTML, or configuration files in the HAATZA Nest project. They include development test files, legacy marketing mockups, and unused folders like `services_discovery/`.

| # | Relative Path | Filename | Format | Dimensions | File Size | Classification Rationale |
|---|---------------|----------|--------|------------|-----------|--------------------------|
| 1 | `public/icons.svg` | `icons.svg` | SVG | N/A | 4.9 KB | Unreferenced SVG icon sprite in `public/icons.svg`. Not linked in `index.html` or referenced in components (Lucide React icons are used instead). |
| 2 | `public/images/action_dusting_pro.jpg` | `action_dusting_pro.jpg` | JPG | 332x682 | 72.3 KB | Unreferenced asset in public folder `public/images/action_dusting_pro.jpg`. Never fetched or referenced by path. |
| 3 | `public/images/action_kitchen_pro.jpg` | `action_kitchen_pro.jpg` | JPG | 343x682 | 68.9 KB | Unreferenced asset in public folder `public/images/action_kitchen_pro.jpg`. Never fetched or referenced by path. |
| 4 | `public/images/haatza-banner-dusting-full.jpg` | `haatza-banner-dusting-full.jpg` | JPG | 1376x768 | 566.4 KB | Unreferenced asset in public folder `public/images/haatza-banner-dusting-full.jpg`. Never fetched or referenced by path. |
| 5 | `public/images/haatza-banner-mopping-full.jpg` | `haatza-banner-mopping-full.jpg` | JPG | 1376x768 | 516.4 KB | Unreferenced asset in public folder `public/images/haatza-banner-mopping-full.jpg`. Never fetched or referenced by path. |
| 6 | `public/images/haatza-nest-app-3d-flow.png` | `haatza-nest-app-3d-flow.png` | PNG | 1024x360 | 235.6 KB | Unreferenced asset in public folder `public/images/haatza-nest-app-3d-flow.png`. Never fetched or referenced by path. |
| 7 | `public/images/haatza-nest-pro-duster.jpg` | `haatza-nest-pro-duster.jpg` | JPG | 341x682 | 32.0 KB | Unreferenced asset in public folder `public/images/haatza-nest-pro-duster.jpg`. Never fetched or referenced by path. |
| 8 | `public/images/haatza-nest-pro-mop.jpg` | `haatza-nest-pro-mop.jpg` | JPG | 336x682 | 27.3 KB | Unreferenced asset in public folder `public/images/haatza-nest-pro-mop.jpg`. Never fetched or referenced by path. |
| 9 | `public/images/haatza-pure-banner-dusting.png` | `haatza-pure-banner-dusting.png` | PNG | 1024x400 | 298.2 KB | Unreferenced asset in public folder `public/images/haatza-pure-banner-dusting.png`. Never fetched or referenced by path. |
| 10 | `public/images/haatza-pure-banner-mopping.png` | `haatza-pure-banner-mopping.png` | PNG | 1024x400 | 298.1 KB | Unreferenced asset in public folder `public/images/haatza-pure-banner-mopping.png`. Never fetched or referenced by path. |
| 11 | `src/assets/haatza-pure-dusting.jpg` | `haatza-pure-dusting.jpg` | JPG | 333x682 | 71.6 KB | Legacy or standalone illustration in `src/assets/haatza-pure-dusting.jpg`. Never imported or referenced across any TSX, TS, CSS, or HTML files. |
| 12 | `src/assets/haatza-pure-kitchen.jpg` | `haatza-pure-kitchen.jpg` | JPG | 344x682 | 68.9 KB | Legacy or standalone illustration in `src/assets/haatza-pure-kitchen.jpg`. Never imported or referenced across any TSX, TS, CSS, or HTML files. |
| 13 | `src/assets/haatza_realistic_map_bg.png` | `haatza_realistic_map_bg.png` | PNG | 800x1200 | 9.0 KB | Legacy or standalone illustration in `src/assets/haatza_realistic_map_bg.png`. Never imported or referenced across any TSX, TS, CSS, or HTML files. |
| 14 | `src/assets/haatza_referral_3d_illustration.png` | `haatza_referral_3d_illustration.png` | PNG | 1218x806 | 798.5 KB | Legacy or standalone illustration in `src/assets/haatza_referral_3d_illustration.png`. Never imported or referenced across any TSX, TS, CSS, or HTML files. |
| 15 | `src/assets/haatza_referral_yellow_brush.png` | `haatza_referral_yellow_brush.png` | PNG | 340x130 | 58.5 KB | Legacy or standalone illustration in `src/assets/haatza_referral_yellow_brush.png`. Never imported or referenced across any TSX, TS, CSS, or HTML files. |
| 16 | `src/assets/test_bubble_area.png` | `test_bubble_area.png` | PNG | 190x100 | 24.9 KB | Development test / scratch artifact created during testing, not referenced anywhere in production code. |
| 17 | `src/assets/test_cal_thumb.png` | `test_cal_thumb.png` | PNG | 512x375 | 208.5 KB | Development test / scratch artifact created during testing, not referenced anywhere in production code. |
| 18 | `src/assets/test_char_crop.png` | `test_char_crop.png` | PNG | 604x403 | 338.3 KB | Development test / scratch artifact created during testing, not referenced anywhere in production code. |
| 19 | `src/assets/test_font.png` | `test_font.png` | PNG | 450x400 | 14.1 KB | Development test / scratch artifact created during testing, not referenced anywhere in production code. |
| 20 | `src/assets/services_discovery/discovery_bathroom.jpg` | `discovery_bathroom.jpg` | JPG | 1200x800 | 146.3 KB | Unreferenced discovery gallery asset in `src/assets/services_discovery/`. No imports or dynamic lookups exist in the application. |
| 21 | `src/assets/services_discovery/discovery_kitchen.jpg` | `discovery_kitchen.jpg` | JPG | 1200x1800 | 201.3 KB | Unreferenced discovery gallery asset in `src/assets/services_discovery/`. No imports or dynamic lookups exist in the application. |
| 22 | `src/assets/services_discovery/discovery_laundry.jpg` | `discovery_laundry.jpg` | JPG | 1200x800 | 82.3 KB | Unreferenced discovery gallery asset in `src/assets/services_discovery/`. No imports or dynamic lookups exist in the application. |
| 23 | `src/assets/services_discovery/discovery_meal_prep.jpg` | `discovery_meal_prep.jpg` | JPG | 1200x795 | 124.4 KB | Unreferenced discovery gallery asset in `src/assets/services_discovery/`. No imports or dynamic lookups exist in the application. |
| 24 | `src/assets/services_discovery/discovery_mopping.jpg` | `discovery_mopping.jpg` | JPG | 1200x1800 | 110.4 KB | Unreferenced discovery gallery asset in `src/assets/services_discovery/`. No imports or dynamic lookups exist in the application. |
| 25 | `src/assets/services_discovery/discovery_sofa.jpg` | `discovery_sofa.jpg` | JPG | 1200x900 | 179.5 KB | Unreferenced discovery gallery asset in `src/assets/services_discovery/`. No imports or dynamic lookups exist in the application. |
| 26 | `src/assets/services_discovery/discovery_wardrobe.jpg` | `discovery_wardrobe.jpg` | JPG | 1200x1600 | 359.5 KB | Unreferenced discovery gallery asset in `src/assets/services_discovery/`. No imports or dynamic lookups exist in the application. |
| 27 | `src/assets/services_discovery/discovery_window.jpg` | `discovery_window.jpg` | JPG | 1200x800 | 103.4 KB | Unreferenced discovery gallery asset in `src/assets/services_discovery/`. No imports or dynamic lookups exist in the application. |

---

## Category C: Duplicate and Near-Duplicate Images

Assets in this group represent exact binary clones (identical MD5 checksums) across `public/` and `src/assets/`, or near-duplicate format/crop iterations (e.g. JPG vs WebP/PNG, or uncropped raw photos).

| # | Relative Path | Filename | Format | Dimensions | File Size | Duplicate Sub-Type | Duplicate Relationship / Reason |
|---|---------------|----------|--------|------------|-----------|--------------------|---------------------------------|
| 1 | `public/images/action_mopping_pro.jpg` | `action_mopping_pro.jpg` | JPG | 325x682 | 70.9 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: 99b6b90d) of src/assets/haatza-pure-mopping.jpg. None of the identical copies are referenced. |
| 2 | `public/images/haatza-banner-kitchen-full.png` | `haatza-banner-kitchen-full.png` | PNG | 1024x400 | 705.9 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: 5dd4eeda) of src/assets/haatza-banner-kitchen-full.png. None of the identical copies are referenced. |
| 3 | `public/images/haatza-nest-3d-calendar.jpg` | `haatza-nest-3d-calendar.jpg` | JPG | 1024x1024 | 475.7 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: d9c329fa) of src/assets/haatza-nest-3d-calendar.jpg. None of the identical copies are referenced. |
| 4 | `public/images/haatza-nest-3d-stopwatch.jpg` | `haatza-nest-3d-stopwatch.jpg` | JPG | 1024x1024 | 544.5 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: 115b3d97) of src/assets/haatza-nest-3d-stopwatch.jpg. None of the identical copies are referenced. |
| 5 | `public/images/haatza-nest-pro-counter.jpg` | `haatza-nest-pro-counter.jpg` | JPG | 333x682 | 82.1 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: 25265c33) of src/assets/haatza-nest-pro-counter.jpg. None of the identical copies are referenced. |
| 6 | `public/images/haatza-nest-pro-triptych.jpg` | `haatza-nest-pro-triptych.jpg` | JPG | 1024x682 | 291.4 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: 1737203a) of src/assets/haatza-nest-pros-action.jpg. None of the identical copies are referenced. |
| 7 | `public/images/experts/and-more.png` | `and-more.png` | PNG | 320x360 | 55.1 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `public/images/experts/and-more.png` (corresponds to paired clean/padded variant). |
| 8 | `public/images/experts/bathroom-cleaning.png` | `bathroom-cleaning.png` | PNG | 320x360 | 55.1 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `public/images/experts/bathroom-cleaning.png` (corresponds to paired clean/padded variant). |
| 9 | `public/images/experts/dishwashing.png` | `dishwashing.png` | PNG | 320x360 | 59.2 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `public/images/experts/dishwashing.png` (corresponds to paired clean/padded variant). |
| 10 | `public/images/experts/dusting-wiping.png` | `dusting-wiping.png` | PNG | 320x360 | 51.9 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `public/images/experts/dusting-wiping.png` (corresponds to paired clean/padded variant). |
| 11 | `public/images/experts/house-cleaning.png` | `house-cleaning.png` | PNG | 320x360 | 49.1 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `public/images/experts/house-cleaning.png` (corresponds to paired clean/padded variant). |
| 12 | `public/images/experts/laundry-ironing.png` | `laundry-ironing.png` | PNG | 320x360 | 56.8 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `public/images/experts/laundry-ironing.png` (corresponds to paired clean/padded variant). |
| 13 | `public/images/experts/meal-prep.png` | `meal-prep.png` | PNG | 320x360 | 61.3 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `public/images/experts/meal-prep.png` (corresponds to paired clean/padded variant). |
| 14 | `src/assets/haatza-banner-kitchen-full.png` | `haatza-banner-kitchen-full.png` | PNG | 1024x400 | 705.9 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: 5dd4eeda) of public/images/haatza-banner-kitchen-full.png. None of the identical copies are referenced. |
| 15 | `src/assets/haatza-nest-3d-calendar.jpg` | `haatza-nest-3d-calendar.jpg` | JPG | 1024x1024 | 475.7 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: d9c329fa) of public/images/haatza-nest-3d-calendar.jpg. None of the identical copies are referenced. |
| 16 | `src/assets/haatza-nest-3d-stopwatch.jpg` | `haatza-nest-3d-stopwatch.jpg` | JPG | 1024x1024 | 544.5 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: 115b3d97) of public/images/haatza-nest-3d-stopwatch.jpg. None of the identical copies are referenced. |
| 17 | `src/assets/haatza-nest-pro-counter.jpg` | `haatza-nest-pro-counter.jpg` | JPG | 333x682 | 82.1 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: 25265c33) of public/images/haatza-nest-pro-counter.jpg. None of the identical copies are referenced. |
| 18 | `src/assets/haatza-nest-pros-action.jpg` | `haatza-nest-pros-action.jpg` | JPG | 1024x682 | 291.4 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: 1737203a) of public/images/haatza-nest-pro-triptych.jpg. None of the identical copies are referenced. |
| 19 | `src/assets/haatza-pure-mopping.jpg` | `haatza-pure-mopping.jpg` | JPG | 325x682 | 70.9 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: 99b6b90d) of public/images/action_mopping_pro.jpg. None of the identical copies are referenced. |
| 20 | `src/assets/haatza_3d_calendar_cutout.png` | `haatza_3d_calendar_cutout.png` | PNG | 1024x1024 | 1021.8 KB | **Near-Duplicate (3D Asset Variant/Cutout)** | Unreferenced 3D calendar/stopwatch render cutout. The application bundles `haatza_3d_calendar_desk_clean_hd.png` instead. |
| 21 | `src/assets/haatza_3d_calendar_desk_transparent.png` | `haatza_3d_calendar_desk_transparent.png` | PNG | 1024x750 | 803.7 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: 5161834b) of src/assets/haatza_3d_calendar_desk_clean_hd.png. Note: One of its identical copies is actively used in the codebase while this copy is redundant. |
| 22 | `src/assets/haatza_3d_stopwatch_cutout.png` | `haatza_3d_stopwatch_cutout.png` | PNG | 1024x1024 | 1.18 MB | **Near-Duplicate (3D Asset Variant/Cutout)** | Unreferenced 3D calendar/stopwatch render cutout. The application bundles `haatza_3d_calendar_desk_clean_hd.png` instead. |
| 23 | `src/assets/haatza_namaste_pro_cutout.png` | `haatza_namaste_pro_cutout.png` | PNG | 1024x935 | 548.8 KB | **Near-Duplicate (Cutout/Crop Iteration)** | Unreferenced cut-out crop iteration of the namaste specialist photo. The active site imports `haatza_namaste_pro_clean.png` and `haatza_namaste_pro_popout.png`. |
| 24 | `src/assets/haatza_namaste_pro_tight.png` | `haatza_namaste_pro_tight.png` | PNG | 1024x917 | 565.4 KB | **Near-Duplicate (Cutout/Crop Iteration)** | Unreferenced cut-out crop iteration of the namaste specialist photo. The active site imports `haatza_namaste_pro_clean.png` and `haatza_namaste_pro_popout.png`. |
| 25 | `src/assets/haatza_nest_hero_panoramic_16_5.jpg` | `haatza_nest_hero_panoramic_16_5.jpg` | JPG | 1600x500 | 156.6 KB | **Near-Duplicate (Aspect Ratio Variant)** | Unreferenced 16:5 panoramic hero banner crop; the site actively uses `haatza_nest_hero_banner_mopping.jpg` and `haatza_nest_hero_banner_official.jpg`. |
| 26 | `src/assets/haatza_nest_logo_raw.png` | `haatza_nest_logo_raw.png` | PNG | 1024x224 | 189.5 KB | **Near-Duplicate (Raw Source Asset)** | Uncropped raw source banner (1024x224) with light background; the site renders the processed, transparent version `haatza_nest_logo.png`. |
| 27 | `src/assets/haatza_pro_popout_clean.png` | `haatza_pro_popout_clean.png` | PNG | 1023x924 | 565.8 KB | **Near-Duplicate (Cutout/Crop Iteration)** | Unreferenced cut-out crop iteration of the namaste specialist photo. The active site imports `haatza_namaste_pro_clean.png` and `haatza_namaste_pro_popout.png`. |
| 28 | `src/assets/haatza_specialist_clean.png` | `haatza_specialist_clean.png` | PNG | 460x413 | 192.5 KB | **Near-Duplicate (Resolution/Feathering Variant)** | Unreferenced specialist cutout variation (clean/feathered variant). The site renders `haatza_house_help_expert_silhouette.png` instead. |
| 29 | `src/assets/haatza_specialist_feathered_hd.png` | `haatza_specialist_feathered_hd.png` | PNG | 920x826 | 571.4 KB | **Near-Duplicate (Resolution/Feathering Variant)** | Unreferenced specialist cutout variation (clean/feathered variant). The site renders `haatza_house_help_expert_silhouette.png` instead. |
| 30 | `src/assets/experts/and-more-clean.png` | `and-more-clean.png` | PNG | 114x134 | 31.3 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/and-more-clean.png` (corresponds to paired clean/padded variant). |
| 31 | `src/assets/experts/and-more.png` | `and-more.png` | PNG | 126x146 | 35.8 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/and-more.png` (corresponds to paired clean/padded variant). |
| 32 | `src/assets/experts/bathroom-cleaning-clean.png` | `bathroom-cleaning-clean.png` | PNG | 120x134 | 30.9 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/bathroom-cleaning-clean.png` (corresponds to paired clean/padded variant). |
| 33 | `src/assets/experts/bathroom-cleaning.png` | `bathroom-cleaning.png` | PNG | 132x146 | 35.4 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/bathroom-cleaning.png` (corresponds to paired clean/padded variant). |
| 34 | `src/assets/experts/dishwashing-clean.png` | `dishwashing-clean.png` | PNG | 128x134 | 34.7 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/dishwashing-clean.png` (corresponds to paired clean/padded variant). |
| 35 | `src/assets/experts/dishwashing.png` | `dishwashing.png` | PNG | 140x146 | 39.4 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/dishwashing.png` (corresponds to paired clean/padded variant). |
| 36 | `src/assets/experts/dusting-wiping-clean.png` | `dusting-wiping-clean.png` | PNG | 117x134 | 31.0 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/dusting-wiping-clean.png` (corresponds to paired clean/padded variant). |
| 37 | `src/assets/experts/dusting-wiping.png` | `dusting-wiping.png` | PNG | 129x146 | 35.8 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/dusting-wiping.png` (corresponds to paired clean/padded variant). |
| 38 | `src/assets/experts/house-cleaning-clean.png` | `house-cleaning-clean.png` | PNG | 138x134 | 33.4 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/house-cleaning-clean.png` (corresponds to paired clean/padded variant). |
| 39 | `src/assets/experts/house-cleaning.png` | `house-cleaning.png` | PNG | 150x146 | 39.1 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/house-cleaning.png` (corresponds to paired clean/padded variant). |
| 40 | `src/assets/experts/laundry-ironing-clean.png` | `laundry-ironing-clean.png` | PNG | 120x134 | 32.3 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/laundry-ironing-clean.png` (corresponds to paired clean/padded variant). |
| 41 | `src/assets/experts/laundry-ironing.png` | `laundry-ironing.png` | PNG | 132x146 | 37.1 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/laundry-ironing.png` (corresponds to paired clean/padded variant). |
| 42 | `src/assets/experts/meal-prep-clean.png` | `meal-prep-clean.png` | PNG | 129x134 | 36.1 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/meal-prep-clean.png` (corresponds to paired clean/padded variant). |
| 43 | `src/assets/experts/meal-prep.png` | `meal-prep.png` | PNG | 141x146 | 41.5 KB | **Near-Duplicate (Trimmed/Padded Variant)** | Unreferenced specialist card icon variant in `src/assets/experts/meal-prep.png` (corresponds to paired clean/padded variant). |
| 44 | `src/assets/services/bathroom-cleaning.webp` | `bathroom-cleaning.webp` | WEBP | 288x408 | 19.6 KB | **Near-Duplicate (.WEBP Format Alternate)** | Unreferenced alternate format (.webp) of `bathroom-cleaning`. The project actively imports and bundles the JPG version instead. |
| 45 | `src/assets/services/dishwashing.webp` | `dishwashing.webp` | WEBP | 288x394 | 24.7 KB | **Near-Duplicate (.WEBP Format Alternate)** | Unreferenced alternate format (.webp) of `dishwashing`. The project actively imports and bundles the JPG version instead. |
| 46 | `src/assets/services/home-care-more.webp` | `home-care-more.webp` | WEBP | 284x394 | 24.7 KB | **Near-Duplicate (.WEBP Format Alternate)** | Unreferenced alternate format (.webp) of `home-care-more`. The project actively imports and bundles the JPG version instead. |
| 47 | `src/assets/services/laundry-ironing.webp` | `laundry-ironing.webp` | WEBP | 284x408 | 22.6 KB | **Near-Duplicate (.WEBP Format Alternate)** | Unreferenced alternate format (.webp) of `laundry-ironing`. The project actively imports and bundles the JPG version instead. |
| 48 | `src/assets/services/meal-assistance.webp` | `meal-assistance.webp` | WEBP | 302x408 | 33.7 KB | **Near-Duplicate (.WEBP Format Alternate)** | Unreferenced alternate format (.webp) of `meal-assistance`. The project actively imports and bundles the JPG version instead. |
| 49 | `src/assets/services/nest_bathroom_cleaning.png` | `nest_bathroom_cleaning.png` | PNG | 288x408 | 189.0 KB | **Near-Duplicate (.PNG Format Alternate)** | Unreferenced alternate format (.png) of `nest_bathroom_cleaning`. The project actively imports and bundles the JPG version instead. |
| 50 | `src/assets/services/nest_dishwashing.png` | `nest_dishwashing.png` | PNG | 288x394 | 210.3 KB | **Near-Duplicate (.PNG Format Alternate)** | Unreferenced alternate format (.png) of `nest_dishwashing`. The project actively imports and bundles the JPG version instead. |
| 51 | `src/assets/services/nest_home_care.png` | `nest_home_care.png` | PNG | 284x394 | 204.6 KB | **Near-Duplicate (.PNG Format Alternate)** | Unreferenced alternate format (.png) of `nest_home_care`. The project actively imports and bundles the JPG version instead. |
| 52 | `src/assets/services/nest_laundry_ironing.png` | `nest_laundry_ironing.png` | PNG | 284x408 | 201.0 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: 4fac1f50) of src/assets/services/nest_steam_ironing.png. None of the identical copies are referenced. |
| 53 | `src/assets/services/nest_meal_assistance.png` | `nest_meal_assistance.png` | PNG | 302x408 | 260.1 KB | **Near-Duplicate (.PNG Format Alternate)** | Unreferenced alternate format (.png) of `nest_meal_assistance`. The project actively imports and bundles the JPG version instead. |
| 54 | `src/assets/services/nest_steam_ironing.jpg` | `nest_steam_ironing.jpg` | JPG | 302x394 | 58.2 KB | **Near-Duplicate / Duplicate Asset** | Unreferenced cutout variant for steam ironing. The application uses `nest_laundry_ironing.jpg` instead. |
| 55 | `src/assets/services/nest_steam_ironing.png` | `nest_steam_ironing.png` | PNG | 284x408 | 201.0 KB | **Exact Binary Duplicate** | Exact binary duplicate (MD5: 4fac1f50) of src/assets/services/nest_laundry_ironing.png. None of the identical copies are referenced. |
| 56 | `src/assets/services/steam-ironing.jpg` | `steam-ironing.jpg` | JPG | 1200x896 | 620.3 KB | **Near-Duplicate (Unused Service Variant)** | Unreferenced service photograph for steam ironing; the project imports `laundry-ironing.jpg` and `nest_laundry_ironing.jpg` instead. |

---

## Category D: Uncertain Assets

Assets where static analysis could not definitively confirm usage due to potential future feature references or runtime mock logic.

| # | Relative Path | Filename | Format | Dimensions | File Size | Reason for Uncertainty |
|---|---------------|----------|--------|------------|-----------|------------------------|
| 1 | `src/assets/booking_pro_official_hd.png` | `booking_pro_official_hd.png` | PNG | 480x560 | 206.6 KB | Pair of specialized specialist portraits (`booking_pro_official_hd.png` and `booking_pro_seamless_hd.png`) prepared for booking profile popups but currently not wired to any view. |
| 2 | `src/assets/booking_pro_seamless_hd.png` | `booking_pro_seamless_hd.png` | PNG | 480x560 | 199.7 KB | Pair of specialized specialist portraits (`booking_pro_official_hd.png` and `booking_pro_seamless_hd.png`) prepared for booking profile popups but currently not wired to any view. |

---

## Architectural Findings & Analysis

### 1. The `public/images/` vs `src/assets/` Redundancy
- Vite processes and bundles assets imported via `src/assets/` by assigning content-hashed file names into `dist/assets/`.
- Assets in `public/images/` are statically copied directly to `dist/images/` during build time, but **zero components in the codebase reference `/images/...` paths**.
- There are **21 identical binary file pairs** existing simultaneously in both folders, creating unnecessary repository bloat without adding any functionality.

### 2. Format Inconsistencies (WebP vs JPG vs PNG)
- The `src/assets/services/` folder contains both `.jpg`, `.png`, and `.webp` versions of multiple service cards (e.g. `nest_bathroom_cleaning.jpg` at 50 KB vs `nest_bathroom_cleaning.png` at 193 KB).
- Components like `HaatzaNestExpertServicesGrid.tsx` import the `.jpg` versions, leaving the heavy `.png` and `.webp` duplicates unreferenced.

### 3. Scratch & Test Assets
- Four explicit test assets (`test_bubble_area.png`, `test_cal_thumb.png`, `test_char_crop.png`, `test_font.png`) remain in `src/assets/`, totaling **~600 KB** of unused development scratch.

### 4. Unused `services_discovery/` Directory
- The entire folder `src/assets/services_discovery/` contains 8 high-resolution photos totaling **~1.33 MB** that are not imported by any page or component.

---

## Recommendations for Safe Review (Prioritized Cleanup Candidates)

When preparing for asset optimization or repository cleanup, prioritize files in the following order:

1. **Priority 1 (Safe to Clean - Dev Scratch & Test Files)**:
   - `src/assets/test_bubble_area.png`
   - `src/assets/test_cal_thumb.png`
   - `src/assets/test_char_crop.png`
   - `src/assets/test_font.png`
   - `public/icons.svg` (Unused sprite; Lucide React is used everywhere).

2. **Priority 2 (Safe to Clean - Exact Binary Duplicates in `public/images/`)**:
   - The 21 duplicate files in `public/images/` that are already bundled through `src/assets/`.

3. **Priority 3 (Safe to Clean - Heavy Format Duplicates)**:
   - `src/assets/services/nest_*.png` (PNG alternates of active JPG cards).
   - `src/assets/services/*.webp` (Unused WebP alternates).

4. **Priority 4 (Review Feature Scope)**:
   - `src/assets/services_discovery/` (Confirm if a future Discovery gallery section is planned before removal).
   - `src/assets/booking_pro_*` (Confirm if specialist modal popups will use these portraits).

---

*Audit completed with zero modifications to workspace files.*