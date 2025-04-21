export interface Sport {
  id: number;
  name: string;
  description: string;
  image: string;
  followed: boolean;
}

export interface Match {
  id: number;
  sportId: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  location: string;
}

export interface Team {
  id: number;
  sportId: number;
  name: string;
  image: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
}

export const sports: Sport[] = [
  {
    id: 1,
    name: 'Basketball',
    description: '',
    image: '/images/basketball.jpeg',
    followed: false,
  },
  {
    id: 2,
    name: 'Cricket',
    description: '',
    image: '/images/cricket.jpeg',
    followed: true,
  },
  {
    id: 3,
    name: 'Lawn-Tennis',
    description: '',
    image: '/images/lawnT.jpeg',
    followed: false,
  },
  {
    id: 4,
    name: 'football',
    description: '',
    image: '/images/football.jpeg',
    followed: false,
  },
  {
    id: 5,
    name: 'table -tennis',
    description: '',
    image: '/images/tableT.jpeg',
    followed: true,
  },
  {
    id: 6,
    name: 'volleyball',
    description: '',
    image: '/images/volleyball.jpeg',
    followed: false,
  },

  {
    id: 7,
    name: 'chess',
    description: '',
    image: '/images/chess.jpeg',
    followed: false,
  }
];

export const matches: Match[] = [
  {
    id: 1,
    sportId: 1,
    homeTeam: 'Campus Tigers',
    awayTeam: 'City Hawks',
    date: '2025-05-05',
    time: '11:00',
    location: 'besides AICTE lab'
  },
  {
    id: 2,
    sportId: 2,
    homeTeam: 'University United',
    awayTeam: 'Regional Rovers',
    date: '2025-05-01',
    time: '16:30',
    location: 'College ground'
  },
  {
    id: 3,
    sportId: 5,
    homeTeam: 'Campus Spikers',
    awayTeam: 'Metro Blockers',
    date: '2025-05-03',
    time: '19:00',
    location: 'CLUb area'
  },
  {
    id: 4,
    sportId: 1,
    homeTeam: 'Campus Tigers',
    awayTeam: 'State Dribblers',
    date: '2025-05-05',
    time: '17:30',
    location: 'besides AICTE lab'
  },
  {
    id: 5,
    sportId: 3,
    homeTeam: 'Campus Rackets',
    awayTeam: 'City Servers',
    date: '2025-05-05',
    time: '15:00',
    location: 'Tennis Courts'
  }
];

export const teams: Team[] = [
  {
    id: 1,
    sportId: 1,
    name: 'Campus Tigers',
    image: '/images/teams/basketball-team.jpg',
    members: [
      {
        id: 1,
        name: 'Alex Johnson',
        position: 'Point Guard',
        image: '/images/members/member1.jpg'
      },
      {
        id: 2,
        name: 'Jamie Smith',
        position: 'Shooting Guard',
        image: '/images/members/member2.jpg'
      },
      {
        id: 3,
        name: 'Taylor Brown',
        position: 'Forward',
        image: '/images/members/member3.jpg'
      }
    ]
  },
  {
    id: 2,
    sportId: 2,
    name: 'University United',
    image: '/images/teams/soccer-team.jpg',
    members: [
      {
        id: 4,
        name: 'Morgan Lee',
        position: 'Goalkeeper',
        image: '/images/members/member4.jpg'
      },
      {
        id: 5,
        name: 'Riley Wilson',
        position: 'Defender',
        image: '/images/members/member5.jpg'
      },
      {
        id: 6,
        name: 'Jordan Miller',
        position: 'Midfielder',
        image: '/images/members/member6.jpg'
      }
    ]
  },
  {
    id: 3,
    sportId: 5,
    name: 'Campus Spikers',
    image: '/images/teams/volleyball-team.jpg',
    members: [
      {
        id: 7,
        name: 'Casey Green',
        position: 'Setter',
        image: '/images/members/member7.jpg'
      },
      {
        id: 8,
        name: 'Avery Davis',
        position: 'Outside Hitter',
        image: '/images/members/member8.jpg'
      },
      {
        id: 9,
        name: 'Quinn Martinez',
        position: 'Middle Blocker',
        image: '/images/members/member9.jpg'
      }
    ]
  }
];