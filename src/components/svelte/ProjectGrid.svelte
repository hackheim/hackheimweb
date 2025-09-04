<script>
    let { projects = [], allTags = [] } = $props();

    let selectedFilter = $state("all");

    let filteredProjects = $derived.by(() => {
        if (selectedFilter === "all") {
            return projects;
        } else {
            return projects.filter((project) =>
                project.data.tags.includes(selectedFilter),
            );
        }
    });

    function formatDate(date) {
        return new Date(date).toLocaleDateString("nb-NO", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    function getDifficultyColor(difficulty) {
        switch (difficulty) {
            case "beginner":
                return "text-green-600 bg-green-100";
            case "intermediate":
                return "text-yellow-600 bg-yellow-100";
            case "advanced":
                return "text-red-600 bg-red-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    }

    function getDifficultyLabel(difficulty) {
        switch (difficulty) {
            case "beginner":
                return "Nybegynner";
            case "intermediate":
                return "Middels";
            case "advanced":
                return "Avansert";
            default:
                return difficulty;
        }
    }
</script>

<!-- Filters -->
<div class="mb-8">
    <div class="flex flex-wrap items-center gap-4 mb-6">
        <h2 class="text-lg font-semibold">Filtrer etter kategori:</h2>
        <button
            class="filter-btn px-4 py-2 rounded-full border transition-colors"
            class:active={selectedFilter === "all"}
            onclick={() => (selectedFilter = "all")}
        >
            Alle
        </button>
        {#each allTags as tag}
            <button
                class="filter-btn px-4 py-2 rounded-full border transition-colors"
                class:active={selectedFilter === tag}
                onclick={() => (selectedFilter = tag)}
            >
                {tag}
            </button>
        {/each}
    </div>
</div>

<!-- Project Grid -->
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="projects-grid">
    {#each filteredProjects as project}
        <article
            class="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden"
        >
            {#if project.data.coverImage}
                <div
                    class="aspect-video overflow-hidden bg-card border-b flex items-center justify-center"
                >
                    <img
                        src={project.data.coverImage}
                        alt={project.data.title}
                        class="w-full h-full object-cover"
                        style="font-size: 0.875rem; text-align: center; color: var(--muted-foreground); padding: 2rem;"
                    />
                </div>
            {/if}

            <div class="p-6">
                <div class="flex flex-wrap items-center gap-1 mb-3">
                    <span
                        class="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                    >
                        {project.data.type === "tutorial"
                            ? "📋 Tutorial"
                            : "🎨 Showcase"}
                    </span>
                    {#each project.data.tags.slice(0, 2) as tag}
                        <span
                            class="px-2 py-1 bg-accent/20 text-accent-foreground rounded text-xs"
                        >
                            {tag}
                        </span>
                    {/each}
                    {#if project.data.type === "tutorial"}
                        <div
                            class="ml-auto px-2 py-1 rounded-full text-xs font-medium {getDifficultyColor(
                                project.data.difficulty,
                            )}"
                        >
                            {getDifficultyLabel(project.data.difficulty)}
                        </div>
                    {/if}
                </div>

                <h3 class="text-lg font-bold mb-3 line-clamp-2">
                    <a
                        href="/projects/{project.id}"
                        class="hover:text-primary transition-colors"
                    >
                        {project.data.title}
                    </a>
                </h3>

                <p class="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                    {project.data.description}
                </p>

                <div
                    class="flex items-center justify-between text-xs text-muted-foreground"
                >
                    <div class="flex items-center">
                        <svg
                            class="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <span>{project.data.author}</span>
                    </div>
                    <span>{formatDate(project.data.date)}</span>
                </div>
            </div>
        </article>
    {/each}
</div>

<!-- Empty State -->
{#if filteredProjects.length === 0}
    <div class="text-center py-12">
        <svg
            class="w-16 h-16 mx-auto mb-4 text-muted-foreground"
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
            />
        </svg>
        <h3 class="text-xl font-semibold mb-2">Ingen prosjekter funnet</h3>
        <p class="text-muted-foreground mb-6">
            Prøv å velge en annen kategori eller fjern filtrene.
        </p>
        <button
            class="filter-btn px-4 py-2 rounded-full border transition-colors"
            onclick={() => (selectedFilter = "all")}
        >
            <svg
                class="w-4 h-4 mr-2 inline"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    fill-rule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clip-rule="evenodd"
                />
            </svg>
            Nullstill filtre
        </button>
    </div>
{/if}

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .filter-btn {
        background: var(--background);
        color: var(--foreground);
        border-color: var(--border);
    }

    .filter-btn:hover {
        background: var(--accent) / 0.1;
        color: var(--accent);
    }

    .filter-btn.active {
        background: var(--accent);
        color: var(--accent-foreground);
        border-color: var(--accent);
    }
</style>
