import Head from 'next/head'
import HomePage from "@components/05-Pages/HomePage/HomePage";


export default function Home() {
    return (
        <>
            <Head>
                <title>MovieLook</title>
                <meta name="description"
                      content="Regardez des films en ligne, sur votre smart TV, console de jeu, PC, Mac, smartphone, tablette et bien plus grace à MovieLook."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <HomePage/>
        </>
    )
}
