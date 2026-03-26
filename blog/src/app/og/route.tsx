import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get('title') || 'Reflections'

  // Load Noto Sans Devanagari for Marathi text rendering
  const fontData = await fetch(
    'https://fonts.gstatic.com/s/notosansdevanagari/v26/TuGOUVpzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b6w.woff2'
  ).then((r) => r.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#faf9f6',
          padding: '60px',
          fontFamily: 'Noto Sans Devanagari',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: '#c9a96e', display: 'flex' }} />

        <div
          style={{
            fontSize: title.length > 40 ? 48 : 60,
            fontWeight: 700,
            color: '#1a1a2e',
            textAlign: 'center',
            lineHeight: 1.3,
            maxWidth: '900px',
            display: 'flex',
          }}
        >
          {title}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: 24,
            color: '#c9a96e',
            letterSpacing: '0.15em',
            display: 'flex',
          }}
        >
          REFLECTIONS
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans Devanagari',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  )
}
