import { type SQSEvent } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import { describe, expect, it } from '@jest/globals';

import { GoogleGeolocationGateway } from '../../adapters/google-geolocation-gateway';

describe('Unit test for app handler', function () {
    it('verifies successful response for Supermercado Pão de Açúcar', async () => {
        const event: SQSEvent = {
            Records: [
                {
                    messageId: '1a2b3c4d-5678-9101-1121-314151617181',
                    receiptHandle: 'AQEBwJnKyrHigUMZj6rYigCgxlaS3SLy0a...',
                    body: '{"nfeId": "32-25/07-17.155.342/0006-08-76-067-001.123.456-200.987.6543","supermarketName": "Supermercado Pão de Açúcar","cnpj": "17.155.342/0006-08","address": "Rua dos Bobos, 0, Centro, 1234567 - São Paulo, SP","date": "2024-07-13T15:45:21.000Z","items": [{"name": "Arroz Branco 5kg","code": "7891234567890","price": 25.90},{"name": "Feijão Preto 1kg","code": "7890987654321","price": 7.50}]}',
                    attributes: {
                        ApproximateReceiveCount: '1',
                        SentTimestamp: '1545082649183',
                        SenderId: 'AIDAIENQZJOLO23YVJ4VO',
                        ApproximateFirstReceiveTimestamp: '1545082649185',
                    },
                    messageAttributes: {},
                    md5OfBody: 'abcd1234abcd1234abcd1234abcd1234',
                    eventSource: 'aws:sqs',
                    eventSourceARN: 'arn:aws:sqs:us-east-2:123456789012:my-queue',
                    awsRegion: 'us-east-2',
                },
            ],
        };
        await expect(lambdaHandler(event)).resolves.toBeUndefined();
    });

    it('verifies successful response for Mercado Extra', async () => {
        const event: SQSEvent = {
            Records: [
                {
                    messageId: '2b3c4d5e-6789-1011-1213-141516171819',
                    receiptHandle: 'AQEBwJnKyrHigUMZj6rYigCgxlaS3SLy0a...',
                    body: '{"nfeId": "33-26/07-18.266.453/0007-09-87-078-002.234.567-300.109.8765","supermarketName": "Mercado Extra","cnpj": "18.266.453/0007-09","address": "Av. Brasil, 123, Copacabana, 8765432 - Rio de Janeiro, RJ","date": "2024-07-14T10:30:00.000Z","items": [{"name": "Leite Integral 1L","code": "7896543210987","price": 3.99},{"name": "Manteiga 200g","code": "7899876543210","price": 8.50}]}',
                    attributes: {
                        ApproximateReceiveCount: '1',
                        SentTimestamp: '1545082649183',
                        SenderId: 'AIDAIENQZJOLO23YVJ4VO',
                        ApproximateFirstReceiveTimestamp: '1545082649185',
                    },
                    messageAttributes: {},
                    md5OfBody: 'dcba4321dcba4321dcba4321dcba4321',
                    eventSource: 'aws:sqs',
                    eventSourceARN: 'arn:aws:sqs:us-east-2:123456789012:my-queue',
                    awsRegion: 'us-east-2',
                },
            ],
        };
        await expect(lambdaHandler(event)).resolves.toBeUndefined();
    });

    it.skip('GoogleGeolocationGateway', async () => {
        const sut = new GoogleGeolocationGateway();
        const response = await sut.getGeoLocationFromAddress(
            'Av. Brasil, 123, Copacabana, 8765432 - Rio de Janeiro, RJ',
        );
        expect(response.latitude).toBe(-22.970722);
        expect(response.longitude).toBe(-43.182365);
    });
});
