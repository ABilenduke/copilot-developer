---
name: sitemap-generation
description: >-
  Manages XML sitemap generation, URL prioritization, and search engine submission.
  Activates when working with sitemaps, sitemap indexes, URL priority, changefreq,
  lastmod timestamps, search engine ping, robots.txt sitemap directives, or when
  the user mentions sitemap, crawl budget, or search indexing.
---

# Sitemap Generation

## When to Apply

- Creating or modifying sitemap generation logic
- Adding new content types that need sitemap entries
- Configuring URL priority or change frequency
- Working with `robots.txt` sitemap directives
- Submitting sitemaps to search engines
- Debugging crawl or indexing issues

## Documentation

Use `search-docs` for detailed Laravel routing and URL generation documentation.

## Sitemap Architecture

Sitemaps are generated dynamically via a dedicated route, not as static files. The `SitemapController` builds XML from published content, respecting the 50,000 URL limit per sitemap file. A sitemap index splits large sites into multiple sitemaps.

<code-snippet name="Sitemap Route Registration" lang="php">
// routes/web.php
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap.index');
Route::get('/sitemap-articles.xml', [SitemapController::class, 'articles'])->name('sitemap.articles');
Route::get('/sitemap-categories.xml', [SitemapController::class, 'categories'])->name('sitemap.categories');
Route::get('/sitemap-pages.xml', [SitemapController::class, 'pages'])->name('sitemap.pages');
</code-snippet>

## URL Priority Rules

Priority values signal relative importance within the site. They do NOT affect ranking directly but influence crawl budget allocation.

| Content Type | Priority | Change Frequency | Notes |
|---|---|---|---|
| Homepage | `1.0` | `daily` | Always highest priority |
| Published articles | `0.8` | `weekly` | Updated content gets `daily` |
| Category pages | `0.6` | `weekly` | Stable structure |
| Tag pages | `0.4` | `monthly` | Low-value aggregation pages |
| Static pages | `0.3` | `yearly` | About, contact, legal |

<code-snippet name="Article Sitemap Entry" lang="php">
// app/Http/Controllers/SitemapController.php
public function articles(): Response
{
    $articles = Article::query()
        ->published()
        ->select(['slug', 'updated_at', 'published_at'])
        ->orderByDesc('published_at')
        ->get();

    return response()
        ->view('sitemaps.articles', ['articles' => $articles])
        ->header('Content-Type', 'application/xml');
}
</code-snippet>

## Lastmod Timestamps

Always use the `updated_at` column for `<lastmod>`. Format as W3C Datetime (ISO 8601). Never use `created_at` — it doesn't reflect content freshness.

<code-snippet name="Lastmod Format" lang="php">
// resources/views/sitemaps/articles.blade.php
<lastmod>{{ $article->updated_at->toW3cString() }}</lastmod>
</code-snippet>

## Robots.txt Integration

The `robots.txt` must declare the sitemap location using an absolute URL. This is configured as a route, not a static file, so the URL adapts to the environment.

<code-snippet name="Robots.txt Sitemap Directive" lang="php">
// routes/web.php
Route::get('/robots.txt', function () {
    $sitemap = route('sitemap.index');

    return response("User-agent: *\nAllow: /\n\nSitemap: {$sitemap}\n")
        ->header('Content-Type', 'text/plain');
});
</code-snippet>

## Cache Strategy

Sitemaps are cached for 1 hour using Laravel's response cache. The cache is busted when articles are published or unpublished via model events.

<code-snippet name="Sitemap Cache" lang="php">
public function articles(): Response
{
    return Cache::remember('sitemap:articles', 3600, function () {
        $articles = Article::query()->published()->get();

        return response()
            ->view('sitemaps.articles', ['articles' => $articles])
            ->header('Content-Type', 'application/xml');
    });
}
</code-snippet>

## Common Pitfalls

- **Including non-published content**: Always filter with `->published()`. Draft, review, and archived articles must never appear in sitemaps.
- **Static file sitemaps**: Never generate static XML files — they go stale. Use dynamic routes with caching.
- **Missing lastmod**: Every `<url>` entry must have `<lastmod>`. Without it, search engines can't determine freshness.
- **Exceeding 50,000 URLs**: A single sitemap file has a 50,000 URL / 50MB limit. Use a sitemap index to split into multiple files when approaching the limit.
- **Relative URLs in sitemap**: All URLs in sitemaps must be absolute. Use `route('name', param, true)` to generate absolute URLs.
