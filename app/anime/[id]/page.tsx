import {Suspense} from "react";
import {getAnimeDetails} from "@/lib/mal";
import AnimeDetailView from "@/components/AnimeDetailView";
import PageLayout, {StatusMessage} from "@/components/PageLayout";

async function AnimeDetails({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const numericId = Number(id);
    const result = await getAnimeDetails(numericId);

    if (!result.ok) {
        return (
            <PageLayout eyebrow="Anime details" title="Unable to load anime">
                <StatusMessage tone="error">{result.error}</StatusMessage>
            </PageLayout>
        );
    }

    return <AnimeDetailView anime={result.data} />;
}

export default function AnimePage({params}: PageProps<"/anime/[id]">) {
    return (
        <Suspense
            fallback={
                <PageLayout eyebrow="Anime details" title="Loading anime">
                    <StatusMessage>Fetching anime details...</StatusMessage>
                </PageLayout>
            }
        >
            <AnimeDetails params={params} />
        </Suspense>
    );
}
