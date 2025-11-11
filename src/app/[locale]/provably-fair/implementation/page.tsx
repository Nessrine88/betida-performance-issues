import { fetchProvablyFairByType } from "@/lib/fetchers/fetch-provably-fair";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { PortableText } from "next-sanity";

export default async function ProvablyFairImplementation() {
  const data = await fetchProvablyFairByType("Implementation");

  return (
    <div className="bg-background-1 rounded-lg p-6 max-w-242 w-full mx-auto h-auto flex flex-col gap-6">
      {data?.length > 0 ? (
        data.map((item, index) => (
          <div key={item._id || index} className="space-y-4">
            <PortableText
              value={item.description}
              components={portableTextComponents}
            />
          </div>
        ))
      ) : (
        <p className="text-foreground/60">No data found for Implementation.</p>
      )}
    </div>
  );
}
