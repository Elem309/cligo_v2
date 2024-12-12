import React, { useEffect, useState } from 'react';
import { Text, XStack, H4, View, Card, H2, Paragraph, Button, Image } from 'tamagui';
import { ScrollView, ActivityIndicator, Linking } from 'react-native';
import API_URL from '../config/Api'; // Adjust this to your API config

function DemoCard({ title, subtitle, cta, image , url}) {
    return (
        <View>
            <Card elevate size="$4" bordered className='mr-3'>
                <Card.Header padded>
                    <H2>{title}</H2>
                    <Paragraph theme="alt2">{subtitle}</Paragraph>
                </Card.Header>
                <Card.Footer padded>
                    <XStack flex={1} />
                    <Button borderRadius="$10" onPress={()=>Linking.openURL(url)}>{cta}</Button>
                </Card.Footer>
                <Card.Background>
                    <Image
                        alignSelf="center"
                        source={{ uri: image }}
                        style={{
                            width: 300,
                            height: 300,
                        }}
                    />
                </Card.Background>
            </Card>
        </View>
    );
}

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await fetch(`${API_URL}/offers`); // Adjust the API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch offers');
                }
                const data = await response.json();
                setOffers(data); // Assume the API returns an array of offers
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View className='mt-3'>
            <H4 className='font-bold mb-3 px-4'>Offers</H4>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="p-3">
                {offers.map((offer, index) => (
                    <DemoCard
                        key={index}
                        title={offer.title}       // Adjust these properties based on your API response
                        subtitle={offer.subtitle}
                        cta={offer.cta}
                        image={offer.image}
                        url={offer.url}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default Offers;
