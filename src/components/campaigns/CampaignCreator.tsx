
const getAudienceInfo = () => {
  if (!initialTemplate) return null;
  
  return (
    <div className="flex items-center gap-2 mt-2">
      <Users className="h-3 w-3 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">
        {initialTemplate.audienceSize && `${translations.audienceSize || 'Tamanho da audiência'}: ${initialTemplate.audienceSize} ${translations.contacts || 'contatos'}`}
        {initialTemplate.audienceSegmentId && ` | ${translations.audienceSegment || 'Segmento'}: ${initialTemplate.audienceSegmentId}`}
      </span>
    </div>
  );
};
