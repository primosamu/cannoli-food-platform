
import React from "react";
import { Users } from "lucide-react";

interface AudienceInfoProps {
  audienceSize?: number;
  audienceSegmentId?: string;
  translations: {
    audienceSize?: string;
    contacts?: string;
    audienceSegment?: string;
  };
}

const AudienceInfo: React.FC<AudienceInfoProps> = ({
  audienceSize,
  audienceSegmentId,
  translations,
}) => {
  if (!audienceSize && !audienceSegmentId) return null;

  return (
    <div className="flex items-center gap-2 mt-2">
      <Users className="h-3 w-3 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">
        {audienceSize &&
          `${translations.audienceSize || "Tamanho da audiência"}: ${audienceSize} ${translations.contacts || "contatos"}`}
        {audienceSegmentId &&
          ` | ${translations.audienceSegment || "Segmento"}: ${audienceSegmentId}`}
      </span>
    </div>
  );
};

export default AudienceInfo;
