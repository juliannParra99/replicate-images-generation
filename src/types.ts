//here I'll put those necessary thing that I'll need from the request that we we'll make to Replicate. Wel'll handle the types for those things that we we'll be using

export interface Prediction{
    status: 'starting' | 'processing' | 'succeeded',
    id: string;
    output: [string, string];
}