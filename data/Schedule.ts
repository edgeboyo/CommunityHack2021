interface TimeRange {
    start: number;
    end: number;
    date: string;
}

interface Schedule {
    schedule: TimeRange[] | null;
}

export { TimeRange, Schedule };