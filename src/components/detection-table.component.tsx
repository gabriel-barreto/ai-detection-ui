import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { get, upperCase } from 'lodash';
import { useMemo } from 'react';

interface Detection {
  at: Date;
  detectionCount: number;
  id: string;
  source: string;
  status: string;
}

const mockDetections = Array.from({ length: 25 }, () => ({
  at: faker.date.past(),
  detectionCount: faker.number.int({ min: 0, max: 2501 }),
  id: faker.string.uuid(),
  source: faker.helpers.arrayElement(['webcam', 'upload']),
  status: faker.helpers.arrayElement(['done', 'processing', 'enqueued', 'failure']),
})) as Array<Detection>;

function DetectionRow({ at, detectionCount, source, status }: Detection) {
  const detectionCountBadgeConfig = useMemo(() => {
    if (detectionCount > 1250) return 'bg-red-500';
    if (detectionCount > 750) return 'bg-orange-800';
    if (detectionCount > 250) return 'bg-yellow-700';
    return 'bg-green-700';
  }, [detectionCount]);

  const statusBadgeConfig = useMemo(() => {
    const badgeConfigByStatus = {
      default: 'bg-purple-500',
      done: 'bg-green-700',
      enqueued: 'bg-yellow-700',
      failure: 'bg-red-500',
      processing: 'bg-blue-700',
    };
    return get(badgeConfigByStatus, status, badgeConfigByStatus.default);
  }, [status]);

  const sourceBadgeConfig = useMemo(() => {
    const badgeConfigBySource = {
      webcam: 'bg-blue-500',
      upload: 'bg-purple-500',
      default: 'bg-green-700',
    };
    return get(badgeConfigBySource, source, badgeConfigBySource.default);
  }, [source]);

  return (
    <TableRow>
      <TableCell>{at.toLocaleDateString('pt-br')}</TableCell>
      <TableCell>
        <Badge className={sourceBadgeConfig}>{upperCase(source)}</Badge>
      </TableCell>
      <TableCell>
        <Badge className={statusBadgeConfig}>{upperCase(status)}</Badge>
      </TableCell>
      <TableCell>
        <Badge className={detectionCountBadgeConfig}>{detectionCount}</Badge>
      </TableCell>
    </TableRow>
  );
}

export function DetectionTable() {
  return (
    <Table>
      <TableCaption>Suas detecções recentes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Fonte</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Detecção</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockDetections.map(e => (
          <DetectionRow {...e} key={e.id} />
        ))}
      </TableBody>
    </Table>
  );
}
