import React from "react";
import Head from 'next/head'
import { Center, Container, Group, Text, Title, Tabs, Card, Box } from '@mantine/core'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/context/firebase';
import styles from '../styles/Transitions.module.css'
import Cards from '../components/Dashboard/UserGrantsSection'
import AdCards from '@/components/Dashboard/AdminGrantsSection';
import Layout from '@/components/Layout/Layout';
import { TabsPanel } from '@mantine/core/lib/Tabs/TabsPanel/TabsPanel';
import { IconBox, IconCoins, IconDeviceWatch, IconUserCircle } from '@tabler/icons-react';

const gradient =
    'linear-gradient(100deg, #F75426 0%, rgba(247, 84, 38, 0) 100%)';

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

export default function Dashboard({ keyItems }: any) {
    return (

        <>
            <Head>
                <title>Dashboard | Stockpile Grants</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <main>
                    <section>
                        <Center>
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
                                    Dashboard{" "}
                                </Title>
                            </div>
                        </Center>
                        <Center>
                            <div className={styles.fadeInUp}>
                                <Text
                                    mb={25}
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
                                    Manage Your User Account.
                                </Text>
                            </div>
                        </Center>
                    </section>
                    <section>
                        <Container>
                            <Tabs color="orange" defaultValue="Overview" >
                                <Tabs.List grow position="center">
                                    <Tabs.Tab value="Overview">Overview</Tabs.Tab>
                                    <Tabs.Tab value="Fundraisers">Fundraisers</Tabs.Tab>
                                    <Tabs.Tab value="Rounds">Rounds</Tabs.Tab>
                                    <Tabs.Tab value="Approvals">Approvals</Tabs.Tab>
                                </Tabs.List>
                                <Tabs.Panel value="Overview">
                                    <Group mt={20} position="center" spacing={5} grow noWrap>
                                        <Card
                                            withBorder
                                            padding="lg"
                                            radius="md"
                                            mr={20}
                                            sx={{
                                                textAlign: "center"
                                            }}
                                        >
                                            <IconBox
                                                size={40}
                                                color={'#FF8B29'}
                                            />
                                            <Text size="xl" mt={10} weight="bold">1</Text>
                                            <Text size="lg" mt={10} weight="semibold">
                                                Total Fundraisers
                                            </Text>
                                            <Text mt={10} color="dimmed">
                                                Users have created 0 unique accounts from deploying a fundraiser or contributing! <br></br>
                                            </Text>
                                        </Card>

                                        <Card
                                            withBorder
                                            padding="lg"
                                            radius="md"
                                            mr={20}
                                            sx={{
                                                textAlign: "center"
                                            }}
                                        >
                                            <IconDeviceWatch
                                                size={40}
                                                color={'#FF8B29'}
                                            />
                                            <Text size="xl" mt={10} weight="bold">1</Text>
                                            <Text size="lg" mt={10} weight="semibold">
                                                Total Rounds Participated
                                            </Text>
                                            <Text mt={10} color="dimmed">
                                                Users have created 0 unique accounts from deploying a fundraiser or contributing! <br></br>
                                            </Text>
                                        </Card>
                                        <Card
                                            withBorder
                                            padding="lg"
                                            radius="md"
                                            sx={{
                                                textAlign: "center"
                                            }}
                                        >
                                            <IconCoins
                                                size={40}
                                                color={'#FF8B29'}
                                            />
                                            <Text size="xl" mt={10} weight="bold">5</Text>
                                            <Text size="lg" mt={10} weight="semibold">
                                                Total Contributions
                                            </Text>
                                            <Text mt={10} color="dimmed">
                                                Users have created 0 unique accounts from deploying a fundraiser or contributing! <br></br>
                                            </Text>
                                        </Card>
                                    </Group>
                                </Tabs.Panel>
                                <Tabs.Panel value="Fundraisers">
                                    <Container mt={20}>
                                        <div className={styles.fadeInUp}>
                                            <Cards grants={keyItems} />
                                        </div>
                                    </Container>
                                </Tabs.Panel>
                                <Tabs.Panel value="Rounds">

                                </Tabs.Panel>
                                <Tabs.Panel value="Approvals">
                                    <Container mt={20}>
                                        <div className={styles.fadeInUp}>
                                            <AdCards grants={keyItems} />
                                        </div>
                                    </Container>
                                </Tabs.Panel>
                            </Tabs>
                        </Container>
                    </section>
                </main>
            </Layout>
        </>
    )
}





