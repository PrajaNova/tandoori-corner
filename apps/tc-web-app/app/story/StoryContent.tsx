import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { StoryArticleCard } from "@/components/common/cards/StoryArticleCard";
import { BackLink } from "@/components/common/layout/BackLink";
import { PageIntro } from "@/components/common/layout/PageIntro";
import { StoryGalleryCard } from "@/components/story/StoryGalleryCard";
import { StoryTeamCard } from "@/components/story/StoryTeamCard";
import { storyArticles, storyGallery, storyTeam } from "@/data/story";

export function StoryContent() {
  return (
    <div className="pt-28 pb-40 bg-card min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <BackLink href="/" icon={<ArrowLeft className="w-4 h-4" />}>
          Back to Home
        </BackLink>

        <PageIntro
          align="center"
          title="About Tandoori Corner"
          className="mb-16"
          description="Tandoori Corner an authentic North Indian Cuisine with Pet-Friendly Alfresco Dining at Balestier Road, Singapore"
          descriptionClassName="text-lg sm:text-xl md:text-2xl"
        >
          <p className="text-gray-600 font-light leading-relaxed text-lg">
            Established in 2008, Tandoori Corner has earned a stellar reputation
            for serving{" "}
            <strong>authentic, mouth-watering North Indian cuisine</strong> to
            discerning food enthusiasts. We are renowned for our commitment to
            exceptional flavours and a memorable dining experience.
          </p>
        </PageIntro>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          <div>
            <h2 className="font-space text-3xl font-bold text-brand-dark mb-8">
              Experience our unique dining options:
            </h2>

            <ul className="space-y-6 text-gray-600 font-light leading-relaxed mb-8 list-disc pl-5">
              <li>
                <strong>Alfresco Dining:</strong> Discover our inviting outdoor
                area, offering stunning views of the Balestier heritage trail.
                We&apos;re proud to be a{" "}
                <strong>pet-friendly restaurant in Singapore</strong>, welcoming{" "}
                <strong>all pet lovers</strong> and their{" "}
                <strong>furry companions</strong> to enjoy a delightful meal.
                It&apos;s the perfect spot for{" "}
                <strong>outdoor dining lovers</strong> in a casual and charming
                setting.
              </li>
              <li>
                <strong>Cozy Indoor Dining:</strong> Prefer a more intimate
                atmosphere? We also offer a{" "}
                <strong>comfortable and cozy indoor dining</strong> area, ideal
                for those seeking a tranquil and inviting space to savour our
                delectable dishes.
              </li>
            </ul>

            <p className="text-gray-600 font-light leading-relaxed">
              Whether you&apos;re searching for the{" "}
              <strong>best North Indian food in Balestier</strong>, a{" "}
              <strong>pet-friendly restaurant near you</strong>, or a{" "}
              <strong>charming Balestier Road restaurant</strong> with both
              outdoor and indoor seating, Tandoori Corner is your ultimate
              destination. Come and experience great flavours in a truly
              inviting ambiance!
            </p>
          </div>
          <div className="relative aspect-[4/3] p-2 border border-[#d48c37]">
            <Image
              fill
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80"
              alt="Restaurant Interior"
              className="w-full h-full object-cover border border-border"
              sizes="(max-width: 1024px) 80vw, 40vw"
            />
          </div>
        </section>

        <section className="mb-32">
          <div className="w-16 h-1 bg-[#d48c37] mx-auto mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {storyTeam.map((member, idx) => (
              <StoryTeamCard key={idx} member={member} />
            ))}
          </div>
        </section>

        <section className="mb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {storyGallery.map((item, idx) => (
              <StoryGalleryCard key={idx} item={item} />
            ))}
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storyArticles.map((article, idx) => (
              <StoryArticleCard key={idx} article={article} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
