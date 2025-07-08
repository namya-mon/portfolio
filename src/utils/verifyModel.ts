export async function verifyModel(path: string): Promise<boolean> {
  try {
    const response = await fetch(path)
    if (!response.ok) return false
    const data = await response.arrayBuffer()
    // Verify GLB magic number
    const header = new Uint8Array(data, 0, 4)
    return header[0] === 0x67 && header[1] === 0x6C && header[2] === 0x54 && header[3] === 0x46
  } catch {
    return false
  }
}