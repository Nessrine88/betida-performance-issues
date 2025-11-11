import { client } from "@/lib/sanity";

export type InternationalizedString = {
  _key: string;
  value: string;
};

export interface InternationalizedContent {
  language: string;
  blocks: any[]; 
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

export interface ApiPage {
  _id: string;
  type: string;
  title: InternationalizedString[];
  disclaimer: InternationalizedContent[];
  activeTokensTitle: InternationalizedString[];
  activeTokensDescription: InternationalizedContent[];
  table?: LegalTable;
}

export const fetchApiPage = async (): Promise<ApiPage | null> => {
  const query = `*[_type == "settingsApi"][0] {
    _id,
    type,
    title,
    disclaimer[] {
      language,
      blocks
    },
    activeTokensTitle,
    activeTokensDescription[] {
      language,
      blocks
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
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching API page:", error);
    return null;
  }
};

export const fetchApiTableData = async (): Promise<any[]> => {
  const apiPage = await fetchApiPage();
  if (apiPage?.table?.rows) {
    return apiPage.table.rows.map((row: TableRow) =>
      row.cells.reduce(
        (acc: Record<string, string>, cell: TableCell, index: number) => {
          const key =
            apiPage.table?.columns[index]?.key?.current || `cell-${index}`;
          acc[key] = cell.value;
          return acc;
        },
        {}
      )
    );
  }
  return [];
};
