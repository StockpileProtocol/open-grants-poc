import React, { useState } from "react";
import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    createStyles,
    Button,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        "&:hover": {
            transform: "scale(1.03)",
        },
    },

    section: {
        borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    label: {
        textTransform: "uppercase",
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}));



interface GrantApproveCardProps {
    id: string,
    name: string,
    description: string,
    imageLink: string,
    tagline: string,
    tag: string,
}


export function AdCards(props: GrantApproveCardProps) {
    const [isApproved, setIsApproved] = useState(false);

    const handleClick = () => {
        setIsApproved(!isApproved);
    };

    const buttonName = isApproved ? 'Undo' : 'Approve';
    const { classes } = useStyles();

    let {
        id,
        name,
        imageLink,
        tagline,
        tag,
    } = props;

    return (
        <>
            <Card
                withBorder
                component="a"
                radius="md"
                p="md"
                shadow="md"
                h={"100%"}
                className={classes.card}
            >
                <Card.Section>
                    <Image src={String(imageLink)} alt="fundraiser image" height={200} />
                </Card.Section>

                <Card.Section className={classes.section} mt="md">
                    <Group position="apart">
                        <Text size="lg" weight={700}>
                            {name}
                        </Text>
                        <Badge variant="outline" color="orange" size="sm" radius="md">
                            {tag}
                        </Badge>
                    </Group>
                    <Group>
                        <Text size="sm" weight={500} mt={5} color="dimmed">
                            {tagline}
                        </Text>
                    </Group>
                </Card.Section>
                <Card.Section p="md">
                    <Button
                        size="lg"
                        fullWidth
                        variant="gradient"
                        gradient={{ from: "#FFA945", to: "#F75426" }}
                        onClick={handleClick}
                        radius="md"
                    >
                        {buttonName}
                    </Button>
                </Card.Section>
            </Card>
        </>
    );
}

export default AdCards;