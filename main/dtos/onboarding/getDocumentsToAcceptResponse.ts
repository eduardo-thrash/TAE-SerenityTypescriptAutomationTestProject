export interface GetDocumentsToAcceptResponse {
    documents: DocumentResponse[]
}

export interface DocumentResponse {
    id: number,
    link: string,
    title: string,
    key: string
}