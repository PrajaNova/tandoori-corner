import Image from "next/image";

import type { TeamMember } from "@/data/types";

export function StoryTeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col">
      <div className="relative mb-6 rounded overflow-hidden aspect-[4/5]">
        <Image
          fill
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <h4 className="font-raleway font-bold text-xl text-brand-dark mb-2">
        {member.name}
      </h4>
      <p className="text-primary font-semibold text-sm mb-6">{member.role}</p>
      <p className="text-gray-600 font-light text-sm leading-relaxed text-left flex-1 line-clamp-4">
        {member.bio}
      </p>
    </div>
  );
}
