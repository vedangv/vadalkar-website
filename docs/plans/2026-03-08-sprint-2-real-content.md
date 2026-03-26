# Sprint 2: Real Content — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all placeholders with real data and images from the original vadalkar.com site.

**Architecture:** Copy optimized images to public/, update projects.ts with full ~215 project list, add image field to Project type, update project cards and team page with real photos.

**Tech Stack:** Next.js Image component, static assets in public/projects/ and public/team/

---

### Task 1: Copy and organize images into public/

Copy project images from .firecrawl/original-site/images/ to public/projects/ and person photos to public/team/. Maintain category subdirectories.

### Task 2: Update Project type and projects.ts with full ~215 projects

Add optional `image` field to Project type. Expand projects array from 145 to ~215 entries using ALL-PROJECTS-SUMMARY.md data. Add `image` paths for projects that have photos. Add new categories: "Special Projects", "Proof Checking", "SPA Tenure".

### Task 3: Update ProjectsGrid to show project images

When a project has an `image` field, show the actual photo instead of the gradient placeholder.

### Task 4: Add Hemant Vadalkar photo to Team page

Copy photo.jpg to public/team/, replace "HV" initials placeholder with real photo using Next.js Image.

### Task 5: Add publications section to Team page

Add 4 published papers from original site to the Team page.

### Task 6: Update text references

Change "View all 100+ projects" → "View all 200+ projects" on home page. Update stats "100+" → "200+".
