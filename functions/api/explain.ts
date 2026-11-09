// Cloudflare Pages Function: POST /api/explain

export async function onRequestPost(context: any) {
  try {
    const request = context.request;
    const body: any = await request.json().catch(() => ({}));
    const issue = body.issue || '';

    if (!issue) {
      return new Response(JSON.stringify({ success: false, message: 'Issue is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Try Cloudflare Workers AI if bound, or generate synthesized edge explanation
    let explanation = `This audit check evaluates '${issue}'. Addressing this enhances website reliability, prevents security vulnerabilities, and improves search rankings.`;

    if (context.env?.AI) {
      try {
        const aiResponse: any = await context.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
          prompt: `Explain this website audit point in simple terms with an actionable fix in 2 short sentences: ${issue}`,
          max_tokens: 150,
        });
        if (aiResponse?.response) {
          explanation = aiResponse.response.trim();
        }
      } catch (aiErr) {
        // Fallback explanation
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          issue,
          explanation,
        },
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message || 'Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
