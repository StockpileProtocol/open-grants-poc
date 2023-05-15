import Head from 'next/head'
import { Center, Container, Group, Text, Title } from '@mantine/core'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/context/firebase';
import styles from '../styles/Transitions.module.css';
import GrantsSection from '@/components/Cards/CardSection';
import Layout from '@/components/Layout/Layout';

export async function getServerSideProps(context: any) {
    let fundraisers = await getDocs(collection(db, `grants`));

    if (!fundraisers) {
        throw new Error("No data found.");
    }

    let keyItems = fundraisers.docs.map((fundraisers) => {
        return {
            id: fundraisers.id,
            data: {
                ...fundraisers.data(),
            },
        };
    });

    return {
        props: {
            keyItems,
        },
    };
}

export default function Home({ keyItems }: any) {
    return (
        <>
            <Head>
                <title>Stockpile Grants</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <main>
                    <section>
                        <Center mt={25}>
                            <div className={styles.fadeInUp}>
                                <Title
                                    size={56}
                                    weight={900}
                                    sx={{
                                        "@media (max-width: 925px)": {
                                            textAlign: "center",
                                            fontSize: 42,
                                        },
                                        "@media (max-width: 520px)": {
                                            textAlign: "center",
                                            fontSize: 36,
                                        },
                                    }}
                                >
                                    Explore{" "}
                                    <Text
                                        component="span"
                                        size={56}
                                        weight={900}
                                        variant="gradient"
                                        gradient={{ from: "orange", to: "red" }}
                                        inherit
                                        sx={{
                                            "@media (max-width: 925px)": {
                                                textAlign: "center",
                                                fontSize: 42,
                                            },
                                            "@media (max-width: 520px)": {
                                                textAlign: "center",
                                                fontSize: 36,
                                            },
                                        }}
                                    >
                                        Grants
                                    </Text>
                                    .
                                </Title>
                            </div>
                        </Center>
                        <Center mt="md">
                            <div className={styles.fadeInUp}>
                                <Text
                                    size="lg"
                                    color="dimmed"
                                    sx={(theme) => ({
                                        textAlign: "center",

                                        "@media (max-width: 925px)": {
                                            textAlign: "center",
                                            fontSize: 14,
                                        },

                                        "@media (max-width: 520px)": {
                                            textAlign: "center",
                                            fontSize: 10,
                                        },
                                    })}
                                >
                                    Quick, easy and open grant applications, powered by Quadratic Funding.
                                </Text>
                            </div>
                        </Center>
                    </section>
                    <section>
                        <Container my={75}>
                            <div className={styles.fadeInUp}>
                                <GrantsSection grants={keyItems} />
                            </div>
                        </Container>
                    </section>
                </main>
            </Layout>
        </>
    )
}
