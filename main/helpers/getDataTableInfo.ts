export const getDataTableInfo = {

    getDataTableParsed: async (dataTable: { rawTable: any }): Promise<{ section: string; message: string }[]> => {    
        return dataTable.rawTable.slice(1).map((row: string[]) => {
            const [section, message] = row;
            return { section, message }
        })
    },

    getDataTabletoAttributesParsed: async (dataTable: any): Promise<{ attributes: string }[]> => {
        return dataTable.rawTable.slice(1).map((row: string[]) => ({
            attributes: row[0]
        }));
    }
}