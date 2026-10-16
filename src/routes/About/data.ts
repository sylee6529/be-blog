/**
 * About 페이지 내용.
 * 출처: APPLICATION-MANAGE 로컬 DB(경험 뱅크, 경력, 학력, 자격증)와
 * 2026-10 이력서, 포트폴리오 제출본. 자료끼리 수치가 다르면 가장 최근 제출본을 따랐다.
 * 문장 안의 **굵게** 는 화면에서 강조로 바뀐다.
 */

export type Link = { label: string; href: string; kind?: "site" | "news" }

export type Kpi = { value: string; label: string }

export type CompareRow = {
  label: string
  before: number
  after: number
  beforeText: string
  afterText: string
  beforeLabel?: string
  afterLabel?: string
}

export type Visual =
  | { kind: "architecture"; title: string }
  | { kind: "deploy"; title: string }
  | { kind: "outbox"; title: string }
  | { kind: "compare"; title: string; rows: CompareRow[] }
  | {
      kind: "lanes"
      title: string
      lanes: { label: string; tone: "before" | "after"; steps: string[] }[]
    }
  | { kind: "states"; title: string; states: string[]; dead: string }
  | { kind: "steps"; title: string; steps: { title: string; detail: string }[] }

export type Highlight = {
  title: string
  kpis: Kpi[]
  problem: string[]
  solution: string[]
  visuals: Visual[]
}

export type Service = {
  name: string
  period: string
  description: string
  role: string
  links?: Link[]
  image?: { src: string; alt: string }
  scale?: Kpi[]
  visuals?: Visual[]
  highlights: Highlight[]
}

export type Work = {
  company: string
  role: string
  period: string
  description: string
  services?: Service[]
  others?: string[]
  summary?: string
}

export type Project = {
  name: string
  context: string
  period: string
  points: string[]
  link?: Link
}

export type TimelineItem = {
  period: string
  title: string
  detail?: string
}

export const about = {
  name: "이서연",
  role: "백엔드 개발자",
  links: [
    { label: "GitHub", href: "https://github.com/sylee6529" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/seoyeon-lee-075514206",
    },
    { label: "sylee6529@gmail.com", href: "mailto:sylee6529@gmail.com" },
  ] as Link[],

  impact: [
    { value: "1,000곳+", label: "국내외 교육기관이 쓰는 서비스 개발" },
    { value: "28배", label: "리드AI 월 유료 사용자, 출시 첫 달 대비 1년 뒤" },
    { value: "19%", label: "경진대회 뒤 참가 기관 유료 전환율 (기존 12%)" },
    { value: "99.95%", label: "월 5만 건 알림톡 전달 성공률" },
  ] as Kpi[],

  intro: [
    "국내외 교육기관이 쓰는 독서와 문해력 교육 서비스를 만들고 운영하는 백엔드 개발자입니다. 학원용 서비스 **리드AI를 출시 때부터 맡아** 지금은 전국 약 300개 학원이 쓰는 서비스로 키우는 데 참여했습니다.",
    "서버가 **매출과 운영에 주는 영향을 숫자로 확인하며** 일합니다. 전국 경진대회에서 **평소 10배의 동시 요청**을 중단 없이 처리했고, 알림톡 발송 구조를 바꿔 학부모에게 닿지 못하던 알림을 **10.5%에서 0.05%로** 줄였습니다.",
    "기획과 화면 개발에도 참여합니다. 데이터로 알림 클릭률이 떨어진 원인을 찾아 **A/B 테스트로 15% 올렸고**, 사내 반복 업무는 관리자 시스템과 Claude API 메신저 봇으로 옮겼습니다.",
  ],

  works: [
    {
      company: "비주얼캠프",
      role: "개발팀 백엔드 개발자",
      period: "2024.08 ~ 현재",
      description: "시선 추적 기반 교육 서비스 기업",
      services: [
        {
          name: "리드AI",
          period: "2025.03 ~ 현재",
          description:
            "AI 시선 추적으로 학생의 문해력을 진단하고 독서를 관리하는 **학원용 서비스**입니다.",
          role: "학습, 결제, 알림 백엔드 API를 설계하고 운영합니다. 결제 연동, 랜딩 페이지, 관리자 시스템도 개발했습니다.",
          links: [{ label: "리드AI 사이트 열기", href: "https://readai.kr/", kind: "site" }],
          image: {
            src: "/about/readai-rocat.jpg",
            alt: "리드AI의 RoCAT 진단 화면. 학생별 진단 결과, 진단 권장 학생, 남은 진단 수가 보입니다. 학생 이름은 가렸습니다.",
          },
          scale: [
            { value: "300개", label: "도입 학원" },
            { value: "28배", label: "월 유료 사용자, 첫 달 대비 1년 뒤" },
          ],
          visuals: [
            { kind: "architecture", title: "서비스 아키텍처" },
            { kind: "deploy", title: "배포 흐름" },
          ],
          highlights: [
            {
              title: "알림톡 발송을 분리해 전달 성공률 **99.95%**",
              kpis: [
                { value: "99.95%", label: "전달 성공률 (기존 89.5%)" },
                { value: "260ms", label: "핵심 API p95 (기존 2초)" },
                { value: "0건", label: "운영자 수동 재발송" },
              ],
              problem: [
                "학습 기록 API 4개가 트랜잭션 안에서 **외부 알림톡 API를 기다려**, 외부가 느려지면 핵심 요청도 느려졌습니다.",
                "재시도가 겹치면 **같은 알림이 두 번** 나갔고, 못 받은 건은 운영자가 직접 찾아 다시 보냈습니다.",
              ],
              solution: [
                "API는 **Outbox에 기록하고 바로 응답**하고, 발송은 Kubernetes CronJob이 맡게 했습니다. 즉시 발송이 필요 없어 SQS 대신 인프라를 늘리지 않는 방식을 골랐습니다.",
                "**잠금 시각과 멱등키**로 중복 발송을 막고, **단말 수신까지 확인**해 실패한 건만 다시 보냈습니다.",
              ],
              visuals: [
                { kind: "outbox", title: "Outbox를 읽는 작업 3개" },
                {
                  kind: "states",
                  title: "발송 상태",
                  states: ["PENDING_SEND", "SENDING", "ACCEPTED", "DELIVERED"],
                  dead: "재시도해도 소용없는 오류는 DEAD",
                },
                {
                  kind: "compare",
                  title: "결과",
                  rows: [
                    {
                      label: "핵심 API p95",
                      before: 2000,
                      after: 260,
                      beforeText: "2초",
                      afterText: "260ms",
                    },
                    {
                      label: "전달 성공률",
                      before: 89.5,
                      after: 99.95,
                      beforeText: "89.5%",
                      afterText: "99.95%",
                    },
                  ],
                },
              ],
            },
            {
              title: "퍼널 분석과 A/B 테스트로 알림톡 클릭률 **15% 상승**",
              kpis: [
                { value: "+15%", label: "클릭률, 대조군 대비" },
                { value: "+8%", label: "코멘트 기능 사용률" },
              ],
              problem: [
                "학부모 알림톡의 **클릭률이 계속 떨어지고** 있었습니다.",
                "Amplitude 퍼널로 보니 **교사가 코멘트를 직접 쓰는 부담**이 커서 코멘트 없는 알림이 많았습니다.",
              ],
              solution: [
                "여러 단계였던 발송 과정을 **한 번에 끝나게** 줄이고, 발송 시점과 문구로 **A/B 테스트를 설계**했습니다.",
                "**LLM이 코멘트 초안을 써 주는 기능**을 제안해 프로덕션에 적용했습니다.",
              ],
              visuals: [
                {
                  kind: "compare",
                  title: "결과 (대조군 = 100)",
                  rows: [
                    {
                      label: "알림톡 클릭률",
                      before: 100,
                      after: 115,
                      beforeText: "100",
                      afterText: "115",
                      beforeLabel: "대조군",
                      afterLabel: "실험군",
                    },
                  ],
                },
              ],
            },
            {
              title: "대시보드를 증분 집계로 바꿔 조회 **4.8초 → 240ms**",
              kpis: [
                { value: "240ms", label: "대시보드 p95 (기존 4.8초)" },
                { value: "35%", label: "DB CPU 최고치 (기존 88%)" },
                { value: "0건", label: "집계 정합성 오류" },
              ],
              problem: [
                "교사 대시보드가 **조회할 때마다 여러 테이블을 조인해 다시 집계**했습니다.",
                "동시 조회 때 DB CPU가 **88%** 까지 올라 학생 학습 API까지 느려졌습니다.",
              ],
              solution: [
                "Materialized View는 갱신마다 전체 집계를 다시 돌려 제외하고, **집계 결과를 Read Model에 미리 저장**했습니다.",
                "학습 이벤트가 생기면 **바뀐 값만 원자적으로 반영**하고, 반영 이력으로 중복 집계를 막았습니다.",
              ],
              visuals: [
                {
                  kind: "lanes",
                  title: "바꾸기 전과 후",
                  lanes: [
                    {
                      label: "전",
                      tone: "before",
                      steps: ["대시보드 조회", "여러 테이블 조인", "매번 전체 집계"],
                    },
                    {
                      label: "후",
                      tone: "after",
                      steps: ["학습 이벤트", "바뀐 값만 반영", "Read Model", "대시보드 조회"],
                    },
                  ],
                },
                {
                  kind: "compare",
                  title: "결과",
                  rows: [
                    {
                      label: "대시보드 p95",
                      before: 4800,
                      after: 240,
                      beforeText: "4.8초",
                      afterText: "240ms",
                    },
                    {
                      label: "DB CPU 최고치",
                      before: 88,
                      after: 35,
                      beforeText: "88%",
                      afterText: "35%",
                    },
                  ],
                },
              ],
            },
            {
              title: "반복 업무를 시스템으로 옮겨 정산 업무시간 **15% 절감**",
              kpis: [
                { value: "15%", label: "정산 업무시간 감소" },
                { value: "40%+", label: "사내 단순 문의 자동 처리" },
                { value: "주 4시간", label: "문의 응대 시간 감소" },
              ],
              problem: [
                "CS, 마케팅, 재무 담당자가 **데이터 조회를 개발팀에 반복 요청**했고, 정산은 수작업이었습니다.",
              ],
              solution: [
                "**AI로 화면 시안을 먼저 만들어** 부서마다 확인받은 뒤 관리자 시스템을 개발했습니다.",
                "월 80건쯤 들어오던 단순 문의는 **Claude API 메신저 봇이 먼저 처리**하도록 바꿨습니다.",
              ],
              visuals: [],
            },
          ],
        },
        {
          name: "제1회 전국 문해력 경진대회",
          period: "2026.03 ~ 2026.04",
          description:
            "에듀조선과 함께 연 **전국 단위 문해력 시험**입니다. 휴대폰 카메라로 시선 흐름을 분석해 초등학생부터 성인까지 진단했습니다.",
          role: "대회 진행 API와 응시 현황 화면을 개발하고 배포와 운영을 맡았습니다. 기여도 60%.",
          links: [
            { label: "대회 페이지 열기", href: "https://readai.kr/contest", kind: "site" },
            {
              label: "조선일보 기사 읽기",
              kind: "news",
              href: "https://www.chosun.com/national/education/2026/03/12/2GR72HQVXJFY7EPKRG5QFSIXF4/",
            },
          ],
          image: {
            src: "/about/contest-dashboard.jpg",
            alt: "전국 문해력 경진대회 기관 화면. 보유 응시권, 대회 일정, 응시생별 응시 현황이 보입니다. 학생 이름은 가렸습니다.",
          },
          highlights: [
            {
              title: "평소 **10배** 동시 요청을 중단 없이 처리, 유료 전환율 **12% → 19%**",
              kpis: [
                { value: "10배", label: "시험 시작 시각 요청량" },
                { value: "0회", label: "대회 기간 서비스 중단" },
                { value: "19%", label: "참가 기관 유료 전환율 (기존 12%)" },
              ],
              problem: [
                "전국 응시자가 **같은 시각에 시작**해 평소 10배 요청이 한꺼번에 몰릴 예정이었습니다.",
              ],
              solution: [
                "**부하 테스트**로 서버 구성을 정하고 인스턴스 증설과 **오토스케일링**을 설정했습니다.",
                "캐시가 동시에 만료돼도 DB가 버티도록 **Redis로 캐시 갱신을 요청 하나만** 맡게 했습니다.",
                "대회 뒤 **참가 기관의 유료 전환율이 올랐고**, 응시 데이터는 학년별 문해력 분포 산출에 쓰였습니다.",
              ],
              visuals: [
                {
                  kind: "compare",
                  title: "결과",
                  rows: [
                    {
                      label: "요청량 (평소 = 1)",
                      before: 1,
                      after: 10,
                      beforeText: "1",
                      afterText: "10",
                      beforeLabel: "평소",
                      afterLabel: "시험 시작",
                    },
                    {
                      label: "참가 기관 유료 전환율",
                      before: 12,
                      after: 19,
                      beforeText: "12%",
                      afterText: "19%",
                      beforeLabel: "대회 전",
                      afterLabel: "대회 뒤",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "리드포스쿨",
          period: "2024.08 ~ 2025.02",
          description:
            "시선 패턴으로 읽기 과정과 문해력을 진단하는 **공교육용 서비스**입니다. 멕시코와 인도 등 해외 학교에서도 씁니다.",
          role: "학생과 교사 화면, 백엔드 API, 운영 기능을 개발하고 유지보수했습니다.",
          links: [{ label: "리드포스쿨 사이트 열기", href: "https://www.readfor.school/ko", kind: "site" }],
          image: {
            src: "/about/readforschool-result.jpg",
            alt: "리드포스쿨 교사용 과제 결과 화면. 학생별 과제 현황과 읽기 유창성, 이해도 같은 AI 과제 평가가 보입니다. 학생 이름은 가렸습니다.",
          },
          scale: [
            { value: "650개", label: "도입 학교와 기관" },
            { value: "8개", label: "지원 언어" },
          ],
          highlights: [
            {
              title: "시선 로그 **3,000만 건**을 서비스 중단 없이 MongoDB로 이관",
              kpis: [
                { value: "3,000만 건", label: "이관한 운영 데이터" },
                { value: "0", label: "사용자 영향" },
              ],
              problem: [
                "로그를 PostgreSQL에 한 행씩 쌓아 세션 하나를 보려면 **테이블 5개를 조인**했고, 느린 조회는 p95 약 3초였습니다.",
                "SDK 버전과 기기마다 필드가 달라 **빈 컬럼이 계속 늘었습니다**.",
              ],
              solution: [
                "조회가 대부분 세션 단위라 **세션 하나를 문서 하나로 묶는** MongoDB 모델을 설계했습니다.",
                "운영 트래픽이 흐르는 상태에서 **네 단계로 검증하며** 옮겼습니다.",
              ],
              visuals: [
                {
                  kind: "steps",
                  title: "이관 단계",
                  steps: [
                    { title: "Dual-write", detail: "두 DB에 함께 쓰고 PostgreSQL을 원본으로 유지" },
                    { title: "Backfill", detail: "과거 데이터를 옮기며 건수와 체크섬 대조" },
                    { title: "Shadow read", detail: "MongoDB 결과를 운영 응답과 비교만" },
                    { title: "Cutover", detail: "불일치 0을 확인하고 전환" },
                  ],
                },
                {
                  kind: "lanes",
                  title: "세션 조회",
                  lanes: [
                    { label: "전", tone: "before", steps: ["세션 조회", "테이블 5개 조인"] },
                    { label: "후", tone: "after", steps: ["세션 조회", "문서 1개 읽기"] },
                  ],
                },
              ],
            },
            {
              title: "새 언어 추가 시간을 최대 3일에서 **2~4시간**으로",
              kpis: [
                { value: "2~4시간", label: "언어 1개 추가 (기존 최대 3일)" },
                { value: "8개", label: "지금 지원하는 언어" },
              ],
              problem: [
                "같은 문구가 화면마다 따로 관리돼 **언어 하나에 최대 3일**이 걸렸습니다.",
              ],
              solution: [
                "반복 문구를 **공통 항목으로 묶고** 나라마다 다른 내용만 분리했습니다.",
                "번역은 **스프레드시트와 다국어 키를 연결**해 관리하고, 공용 UI는 TurboRepo와 Storybook으로 한곳에서 관리했습니다.",
              ],
              visuals: [],
            },
          ],
        },
        {
          name: "Seeso Web SDK",
          period: "2024.11 ~ 2024.12",
          description: "외부 개발사에 제공하는 **웹용 시선 추적 SDK**입니다. 지금 이름은 Eyedid SDK입니다.",
          role: "JavaScript SDK를 TypeScript로 옮기고 프레임 처리 성능을 개선했습니다.",
          links: [{ label: "SDK 문서 열기", href: "https://docs.eyedid.ai/", kind: "site" }],
          image: {
            src: "/about/sdk-docs.jpg",
            alt: "Eyedid SDK 문서 사이트 첫 화면. 노트북, 모니터, 태블릿, 휴대폰에서 쓰는 멀티 플랫폼 시선 추적 SDK라는 소개가 보입니다.",
          },
          highlights: [
            {
              title: "불필요한 변환 단계를 없애 프레임 처리 속도 **4배**",
              kpis: [{ value: "4배", label: "프레임 처리 속도" }],
              problem: [
                "저사양 기기에서 **CPU와 메모리 사용량이 높아** 프레임 처리가 지연됐습니다.",
              ],
              solution: [
                "**Performance API로 프레임 처리 구간별 소요 시간을 계측**해, WebAssembly 입력 직전의 **중복 데이터 변환이 병목**임을 확인했습니다.",
                "이 변환을 제거해 **프레임 데이터를 WebAssembly로 바로 전달**하도록 바꿨습니다.",
              ],
              visuals: [
                {
                  kind: "lanes",
                  title: "바꾸기 전과 후",
                  lanes: [
                    {
                      label: "전",
                      tone: "before",
                      steps: ["카메라 프레임", "중복 데이터 변환", "WebAssembly"],
                    },
                    { label: "후", tone: "after", steps: ["카메라 프레임", "WebAssembly"] },
                  ],
                },
              ],
            },
          ],
        },
      ],
      others: [
        "**ECS에서 EKS로** 서비스를 옮겨 AWS 비용을 줄였습니다.",
        "**Prometheus, Grafana, Loki**로 모니터링과 Slack 알림을 구성해 느린 쿼리를 찾아 고쳤습니다.",
        "좌석 예약에 **분산 락**을 적용하고, 미출석 좌석은 SQS 지연 메시지로 회수했습니다.",
        "팀에 **AI 코드 리뷰와 에이전트 기반 개발**을 도입하는 사내 스터디를 이끌었습니다.",
      ],
    },
    {
      company: "코드프레소",
      role: "백엔드 개발 인턴",
      period: "2021.09 ~ 2022.02",
      description: "기업 대상 IT 직무 교육 스타트업",
      summary:
        "Python으로 웹 동영상 편집 서비스의 서버와 영상 처리 로직을, Vue.js와 TypeScript로 사내 운영 페이지를 개발했습니다.",
    },
  ] as Work[],

  projects: [
    {
      name: "맛 스페이스",
      context: "크래프톤 정글 3기",
      period: "2023.10 ~ 2024.03",
      points: [
        "여러 사람이 함께 식당을 고를 때 **취향과 실시간 투표를 함께 반영**하는 추천 서비스",
        "NestJS와 Redis, **Socket.IO로 같은 방의 선택을 실시간 공유**",
        "맛집 리뷰 **약 7만 건**을 모아 식당 1만 8천 곳을 임베딩하고 벡터 유사도로 검색",
      ],
      link: {
        label: "GitHub",
        href: "https://github.com/sylee6529/matspace-backend",
      },
    },
    {
      name: "함께가길",
      context: "청년취업사관학교 SeSAC",
      period: "2024.05 ~ 2024.06",
      points: [
        "교통약자가 **접근성 정보를 보고 장소를 고르는** 리뷰 서비스",
        "Spring Boot와 **PostGIS로 반경 안 시설 조회**와 접근성 점수 추천 API 구현",
        "이용자 리뷰를 근거로 장소를 추천하는 **RAG 기능** 구현",
      ],
      link: { label: "GitHub", href: "https://github.com/sylee6529/sloped-be" },
    },
  ] as Project[],

  education: [
    {
      period: "2026.07 ~ 2026.09",
      title: "오픈소스 컨트리뷰션 아카데미 OSSCA Challengers 수료",
      detail: "데이터 분석 도구 Apache Zeppelin에 기여했습니다.",
    },
    {
      period: "2020.03 ~ 2025.08",
      title: "동덕여자대학교 컴퓨터학과 졸업",
      detail: "전공 튜터로 멘티 전원이 평균 A0 이상을 받아 최우수 튜터로 선정됐습니다.",
    },
    {
      period: "2024.05 ~ 2024.06",
      title: "청년취업사관학교 SeSAC 백엔드 과정",
    },
    {
      period: "2023.10 ~ 2024.03",
      title: "크래프톤 정글 3기",
      detail: "PintOS 프로젝트에서 C로 스레드 스케줄링, 동기화, 시스템 콜을 구현했습니다.",
    },
  ] as TimelineItem[],

  awards: [
    {
      period: "2024.11",
      title: "교내 소프트웨어 경진대회 최우수상",
      detail: "조별 발표자료를 실시간으로 함께 만드는 플랫폼 피피또를 혼자 개발했습니다.",
    },
    { period: "2023.05", title: "교내 생성형 AI 활용 공모전 대상" },
    {
      period: "2023.02",
      title: "대학연합 IT 동아리 UMC 우수상",
      detail: "커리어 기록 안드로이드 앱을 기한 안에 출시했습니다.",
    },
    { period: "2023.09", title: "정보처리기사" },
    { period: "2021.10", title: "SQLD" },
  ] as TimelineItem[],

  skills: [
    {
      label: "서버",
      items: [
        { name: "Java", icon: "openjdk" },
        { name: "Spring Boot", icon: "springboot" },
        { name: "JPA", icon: "hibernate" },
        { name: "QueryDSL" },
        { name: "NestJS", icon: "nestjs" },
        { name: "TypeScript", icon: "typescript" },
      ],
    },
    {
      label: "데이터",
      items: [
        { name: "MySQL", icon: "mysql" },
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "Redis", icon: "redis" },
      ],
    },
    {
      label: "인프라",
      items: [
        { name: "AWS" },
        { name: "Kubernetes", icon: "kubernetes" },
        { name: "Argo CD", icon: "argo" },
        { name: "Docker", icon: "docker" },
        { name: "Grafana", icon: "grafana" },
      ],
    },
    {
      label: "화면",
      items: [
        { name: "Next.js", icon: "nextdotjs" },
        { name: "TanStack Query", icon: "reactquery" },
        { name: "Vue.js", icon: "vuedotjs" },
      ],
    },
  ] as { label: string; items: { name: string; icon?: string }[] }[],
}
