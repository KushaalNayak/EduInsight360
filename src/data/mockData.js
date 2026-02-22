export const mockStudents = [
    {
        id: '2400030188',
        name: 'Nischal Singana',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nischal',
        email: 'nischalsingana@kluniversity.in',
        grade: 'B Tech - 2nd year',
        overallScore: 9.36,
        attendance: 85,
        subjects: [
            { name: 'Designs and Analysis of Algorithms', score: 92, trend: 'up', teacher: 'Dr. Smith' },
            { name: 'Data Structures', score: 85, trend: 'stable', teacher: 'Prof. Miller' },
            { name: 'Computer Networks', score: 78, trend: 'down', teacher: 'Dr. Brown' },
            { name: 'Operating Systems', score: 95, trend: 'up', teacher: 'Ms. Davis' },
            { name: 'Database Management Systems', score: 88, trend: 'stable', teacher: 'Mr. Wilson' },
        ],
        recentActivity: [
            { task: 'Quiz', date: '2026-02-15', score: 25 },
            { task: 'Lab', date: '2026-02-12', score: 22 },
            { task: 'Test', date: '2026-02-10', score: 24 },
        ],
        improvementTrends: [
            { month: 'Sep', score: 8.8 },
            { month: 'Oct', score: 8.2 },
            { month: 'Nov', score: 8.0 },
            { month: 'Dec', score: 8.5 },
            { month: 'Jan', score: 8.4 },
            { month: 'Feb', score: 9.36 },
        ],
        strengths: ['Analytical Thinking', 'Problem Solving', 'Creative Writing'],
        weaknesses: ['Public Speaking', 'Time Management'],
        recommendations: [
            'Maintain current academic consistency.',
            'Participate in more group discussions to improve confidence.',
            'Practice advanced algorithms problems regularly.'
        ]
    },
    {
        id: '2400080210',
        name: 'Sudheer Bhuvana',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sudheer',
        email: 'sudheer@kluniversity.in',
        grade: 'B Tech - 2nd year',
        overallScore: 9.49,
        attendance: 92,
        subjects: [
            { name: 'Designs and Analysis of Algorithms', score: 95, trend: 'up', teacher: 'Dr. Smith' },
            { name: 'Data Structures', score: 94, trend: 'up', teacher: 'Prof. Miller' },
            { name: 'Computer Networks', score: 88, trend: 'stable', teacher: 'Dr. Brown' },
            { name: 'Operating Systems', score: 96, trend: 'up', teacher: 'Ms. Davis' },
            { name: 'Database Management Systems', score: 91, trend: 'stable', teacher: 'Mr. Wilson' },
        ],
        recentActivity: [
            { task: 'System Midterm', date: '2026-02-18', score: 98 },
            { task: 'Network Lab', date: '2026-02-11', score: 95 },
        ],
        improvementTrends: [
            { month: 'Sep', score: 9.0 },
            { month: 'Oct', score: 9.1 },
            { month: 'Nov', score: 9.2 },
            { month: 'Dec', score: 9.3 },
            { month: 'Jan', score: 9.4 },
            { month: 'Feb', score: 9.49 },
        ],
        strengths: ['System Architecture', 'Network Security', 'Leadership'],
        weaknesses: ['Academic Documentation'],
        recommendations: [
            'Explore research opportunities in Distributed Systems.',
            'Target a perfect 10 CGPA for the upcoming semester.'
        ]
    },
    {
        id: '2400033126',
        name: 'Maheswar P',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maheswar',
        email: 'maheswar@kluniversity.in',
        grade: 'B Tech - 2nd year',
        overallScore: 7.8,
        attendance: 78,
        status: '2 BACKLOGS',
        subjects: [
            { name: 'Designs and Analysis of Algorithms', score: 65, trend: 'down', teacher: 'Dr. Smith' },
            { name: 'Data Structures', score: 60, trend: 'down', teacher: 'Prof. Miller' },
            { name: 'Computer Networks', score: 72, trend: 'stable', teacher: 'Dr. Brown' },
            { name: 'Operating Systems', score: 82, trend: 'up', teacher: 'Ms. Davis' },
            { name: 'Database Management Systems', score: 75, trend: 'stable', teacher: 'Mr. Wilson' },
        ],
        recentActivity: [
            { task: 'Supplementary Exam', date: '2026-02-05', score: 70 },
            { task: 'Weekly Assessment', date: '2026-02-20', score: 62 },
        ],
        improvementTrends: [
            { month: 'Sep', score: 8.0 },
            { month: 'Oct', score: 7.9 },
            { month: 'Nov', score: 7.7 },
            { month: 'Dec', score: 7.6 },
            { month: 'Jan', score: 7.7 },
            { month: 'Feb', score: 7.8 },
        ],
        strengths: ['UI Design', 'Collaboration'],
        weaknesses: ['Numerical Logic', 'Data Structures'],
        recommendations: [
            'Prioritize backlog clearance in the first half of the semester.',
            'Attend remedial sessions for DAA and DS.'
        ]
    },
    {
        id: '2400033137',
        name: 'Devaram CM',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Devaram',
        email: 'devaramcm@kluniversity.in',
        grade: 'B Tech - 2nd year',
        overallScore: 5.29,
        attendance: 65,
        status: '5 BACKLOGS',
        subjects: [
            { name: 'Designs and Analysis of Algorithms', score: 45, trend: 'down', teacher: 'Dr. Smith' },
            { name: 'Data Structures', score: 42, trend: 'down', teacher: 'Prof. Miller' },
            { name: 'Computer Networks', score: 50, trend: 'stable', teacher: 'Dr. Brown' },
            { name: 'Operating Systems', score: 55, trend: 'stable', teacher: 'Ms. Davis' },
            { name: 'Database Management Systems', score: 48, trend: 'down', teacher: 'Mr. Wilson' },
        ],
        recentActivity: [
            { task: 'Internal Assessment', date: '2026-02-15', score: 45 },
            { task: 'Lab Record Submission', date: '2026-02-10', score: 100 },
        ],
        improvementTrends: [
            { month: 'Sep', score: 6.0 },
            { month: 'Oct', score: 5.8 },
            { month: 'Nov', score: 5.5 },
            { month: 'Dec', score: 5.3 },
            { month: 'Jan', score: 5.2 },
            { month: 'Feb', score: 5.29 },
        ],
        strengths: ['Sports', 'Extracurricular Activities'],
        weaknesses: ['Academic Discipline', 'Algorithm Design'],
        recommendations: [
            'Immediate counseling session required with HOD.',
            'Strict adherence to the academic improvement plan.'
        ]
    }
];

export const classStats = {
    averageScore: 7.98,
    topPerformer: 'Sudheer Bhuvana',
    attendanceRate: 80.0,
    passingRate: 75.0,
    subjectAverages: [
        { subject: 'DAA', average: 7.5 },
        { subject: 'DS', average: 7.0 },
        { subject: 'CN', average: 7.2 },
        { subject: 'OS', average: 8.2 },
        { subject: 'DBMS', average: 7.6 },
    ],
    genderDistribution: [
        { name: 'Male', value: 100 },
        { name: 'Female', value: 0 },
    ]
};
