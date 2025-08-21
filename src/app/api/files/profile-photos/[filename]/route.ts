
import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"
import { lookup } from "mime-types"

export const dynamic = "force-dynamic"

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename
    
    if (!filename) {
      return new NextResponse('Filename is required', { status: 400 })
    }

    // Security check - prevent directory traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return new NextResponse('Invalid filename', { status: 400 })
    }

    const filePath = join(process.cwd(), 'uploads', 'profile-photos', filename)
    
    try {
      const fileBuffer = await readFile(filePath)
      const mimeType = lookup(filename) || 'application/octet-stream'

      return new NextResponse(fileBuffer as BodyInit, {
        status: 200,
        headers: {
          'Content-Type': mimeType,
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        }
      })
    } catch (readError: any) {
      if (readError.code === 'ENOENT') {
        return new NextResponse('File not found', { status: 404 })
      }
      throw readError
    }

  } catch (error) {
    console.error("Error serving profile photo:", error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
