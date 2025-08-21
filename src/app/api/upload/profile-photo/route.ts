
import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { randomBytes } from "crypto"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      )
    }

    // Generate unique filename
    const bytes = randomBytes(16).toString('hex')
    const extension = file.name.split('.').pop()
    const fileName = `${bytes}.${extension}`

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'uploads', 'profile-photos')
    await mkdir(uploadsDir, { recursive: true })

    // Save file
    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = join(uploadsDir, fileName)
    await writeFile(filePath, buffer)

    // Return the URL for accessing the file
    const fileUrl = `/api/files/profile-photos/${fileName}`

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName
    })

  } catch (error) {
    console.error("Error uploading profile photo:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
