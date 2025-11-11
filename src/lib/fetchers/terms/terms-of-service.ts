import { client } from "@/lib/sanity";

export type InternationalizedString = {
  _key: string;
  value: string;
};

export interface DescriptionItemContent {
  language: string;
  blocks: any[]; // PortableText blocks
}

export interface DescriptionItem {
  index: number;
  content: DescriptionItemContent[];
}

export interface TableColumn {
  key: {
    _type: "slug";
    current: string;
  };
  label: string;
  align?: string;
}

export interface TableCell {
  value: string;
}

export interface TableRow {
  cells: TableCell[];
}

export interface LegalTable {
  columns: TableColumn[];
  rows: TableRow[];
}

export interface LegalDocument {
  _id: string;
  type: string;
  title: InternationalizedString[];
  description: DescriptionItem[];
  table?: LegalTable;
}

export const fetchLegalDocument = async (
  type: string
): Promise<LegalDocument | null> => {
  const query = `*[_type == "legalDocument" && type == $type][0] {
    _id,
    type,
    title,
    description[] {
      index,
      content[] {
        language,
        blocks
      }
    },
    table {
      columns[] {
        key,
        label,
        align
      },
      rows[] {
        cells[] {
          value
        }
      }
    }
  }`;

  try {
    return await client.fetch(query, { type });
  } catch (error) {
    console.error(`Error fetching legal document of type ${type}:`, error);
    return null;
  }
};
